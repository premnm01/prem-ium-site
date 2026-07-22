import { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, MeshDistortMaterial } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

/** Turns a "r g b" custom-prop triple into a #hex THREE.Color can parse. Must
 *  read --accent-rgb (raw triple), NOT --accent (an unresolved rgb(var(...))
 *  string THREE can't parse — it silently falls back to white). */
function tripleToHex(triple: string, fallback: string): string {
  const parts = triple.trim().split(/\s+/).map(Number);
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return fallback;
  return '#' + parts.map((n) => Math.max(0, Math.min(255, n)).toString(16).padStart(2, '0')).join('');
}

function useThemeColors() {
  const [c, setC] = useState({ accent: '#e5484d', pop: '#f2c14e' });
  useEffect(() => {
    const read = () => {
      const s = getComputedStyle(document.documentElement);
      setC({
        accent: tripleToHex(s.getPropertyValue('--accent-rgb'), '#e5484d'),
        pop: tripleToHex(s.getPropertyValue('--pop-rgb'), '#f2c14e'),
      });
    };
    read();
    const obs = new MutationObserver(read);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);
  return c;
}

const N = 18;
const ORIGIN = new THREE.Vector3(0, 0, 0);
const rand = (a: number, b: number) => a + Math.random() * (b - a);
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smooth = (t: number) => t * t * (3 - 2 * t);

/** A field of small bubbles that drift with scroll at their own random rates
 *  (parallax, no coordinated path), then merge into one huge blob as the
 *  contact section comes into view. */
function BubbleField({ accent, pop }: { accent: string; pop: string }) {
  const bubbleRefs = useRef<(THREE.Mesh | null)[]>([]);
  const matRefs = useRef<(THREE.MeshStandardMaterial | null)[]>([]);
  const mergeRef = useRef<THREE.Mesh>(null);
  const converge = useRef(0);
  const scrollP = useRef(0);
  const contactEl = useRef<HTMLElement | null>(null);

  useEffect(() => {
    contactEl.current = document.getElementById('contact');
  }, []);

  // Per-bubble random params (home position, drift, float, size, phase).
  const bubbles = useMemo(
    () =>
      Array.from({ length: N }, () => ({
        home: new THREE.Vector3(rand(-4.6, 4.6), rand(-2.6, 2.6), rand(-2.2, 1.4)),
        drift: new THREE.Vector3(rand(-2.4, 2.4), rand(-3.2, 3.2), rand(-1.2, 1.2)),
        floatAmp: new THREE.Vector3(rand(0.2, 0.7), rand(0.2, 0.7), rand(0.15, 0.45)),
        speed: new THREE.Vector3(rand(0.3, 0.9), rand(0.3, 0.9), rand(0.2, 0.6)),
        phase: new THREE.Vector3(rand(0, 6.28), rand(0, 6.28), rand(0, 6.28)),
        size: rand(0.16, 0.42),
        spin: rand(0.1, 0.5),
      })),
    [],
  );

  const _v = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const d = Math.min(delta, 0.05);

    // whole-page scroll progress
    const max = document.documentElement.scrollHeight - window.innerHeight;
    scrollP.current = max > 0 ? clamp01(window.scrollY / max) : 0;

    // converge: ramps 0→1 as the contact section fills the viewport
    let cv = 0;
    if (contactEl.current) {
      const r = contactEl.current.getBoundingClientRect();
      const topDoc = r.top + window.scrollY;
      cv = clamp01((window.scrollY + window.innerHeight - topDoc) / (window.innerHeight * 0.85));
    }
    converge.current = THREE.MathUtils.lerp(converge.current, cv, 0.12);
    const cvS = smooth(converge.current);
    const sp = scrollP.current;

    for (let i = 0; i < N; i++) {
      const m = bubbleRefs.current[i];
      const b = bubbles[i];
      if (!m) continue;
      // random parallax drift + gentle float
      _v.set(
        b.home.x + Math.sin(t * b.speed.x + b.phase.x) * b.floatAmp.x + sp * b.drift.x,
        b.home.y + Math.cos(t * b.speed.y + b.phase.y) * b.floatAmp.y + sp * b.drift.y,
        b.home.z + Math.sin(t * b.speed.z + b.phase.z) * b.floatAmp.z,
      );
      // pull toward centre as we converge
      _v.lerp(ORIGIN, cvS);
      m.position.copy(_v);
      m.rotation.y += d * b.spin;
      const s = b.size * (1 - cvS * 0.85);
      m.scale.setScalar(s);
      const mat = matRefs.current[i];
      if (mat) mat.opacity = 1 - cvS;
    }

    // the merged mega-blob grows + fades in at the end
    if (mergeRef.current) {
      const scale = THREE.MathUtils.lerp(0.02, 2.7, cvS);
      mergeRef.current.scale.setScalar(scale);
      mergeRef.current.rotation.y += d * 0.15;
      mergeRef.current.rotation.x = state.pointer.y * 0.4;
      const mm = mergeRef.current.material as THREE.Material & { opacity: number };
      mm.opacity = cvS;
      mergeRef.current.visible = cvS > 0.01;
    }
  });

  return (
    <group>
      {bubbles.map((b, i) => (
        <mesh key={i} ref={(el) => (bubbleRefs.current[i] = el)} position={b.home}>
          <icosahedronGeometry args={[1, 3]} />
          <meshStandardMaterial
            ref={(el) => (matRefs.current[i] = el as THREE.MeshStandardMaterial)}
            color={i % 2 ? pop : accent}
            emissive={i % 2 ? pop : accent}
            emissiveIntensity={0.5}
            metalness={0.35}
            roughness={0.3}
            transparent
            opacity={1}
          />
        </mesh>
      ))}

      <mesh ref={mergeRef} visible={false}>
        <icosahedronGeometry args={[1.3, 20]} />
        <MeshDistortMaterial
          color={accent}
          emissive={pop}
          emissiveIntensity={0.45}
          distort={0.4}
          speed={2.1}
          roughness={0.22}
          metalness={0.45}
          transparent
          opacity={0}
        />
      </mesh>
    </group>
  );
}

/** Camera leans with the pointer for a real perspective shift (parallax). */
function Rig() {
  useFrame((state) => {
    const { camera, pointer } = state;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 1.2, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.8, 0.05);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/** Fixed, full-viewport WebGL layer behind the page content
 *  (pointer-events-none). Pauses when the tab is hidden. */
export default function FlyingBlob() {
  const { accent, pop } = useThemeColors();
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const onVis = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0" style={{ zIndex: -5 }}>
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop={visible ? 'always' : 'never'}
        eventSource={typeof document !== 'undefined' ? document.documentElement : undefined}
        eventPrefix="client"
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={32} color={pop} />
        <pointLight position={[-5, -3, 2]} intensity={22} color={accent} />
        <Suspense fallback={null}>
          <BubbleField accent={accent} pop={pop} />
          <Environment resolution={256}>
            <Lightformer intensity={2.4} position={[0, 3, 3]} scale={6} color={pop} />
            <Lightformer intensity={2.0} position={[-3, -1, 2]} scale={5} color={accent} />
            <Lightformer intensity={0.8} position={[3, 1, -2]} scale={5} color="#ffffff" />
          </Environment>
        </Suspense>
        <Rig />
        <EffectComposer>
          <Bloom mipmapBlur intensity={0.4} luminanceThreshold={0.7} luminanceSmoothing={0.2} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
