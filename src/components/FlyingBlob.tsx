import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Lightformer, MeshDistortMaterial } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// Whole-page scroll progress (0 at top → 1 at the very bottom), written by a
// passive scroll listener and read inside useFrame so the blob's flight path
// updates without React re-renders.
const scroll = { current: 0 };

/** Turns a "r g b" custom-prop triple into a #hex THREE.Color can parse. Must
 *  read --accent-rgb (raw triple), NOT --accent (an unresolved rgb(var(...))
 *  string THREE can't parse — it silently falls back to white). */
function tripleToHex(triple: string, fallback: string): string {
  const parts = triple.trim().split(/\s+/).map(Number);
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return fallback;
  return '#' + parts.map((n) => Math.max(0, Math.min(255, n)).toString(16).padStart(2, '0')).join('');
}

/** Reads the theme's accent/pop so the blob recolours live with the palette. */
function useThemeColors() {
  const [c, setC] = useState({ accent: '#3f6b4a', pop: '#d4a94a' });
  useEffect(() => {
    const read = () => {
      const s = getComputedStyle(document.documentElement);
      setC({
        accent: tripleToHex(s.getPropertyValue('--accent-rgb'), '#3f6b4a'),
        pop: tripleToHex(s.getPropertyValue('--pop-rgb'), '#d4a94a'),
      });
    };
    read();
    const obs = new MutationObserver(read);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);
  return c;
}

/** The blob + its orbiting shards, wrapped in a group whose position weaves
 *  across the viewport as you scroll — the "flying around" parallax path.
 *  Starts on the right (matching the hero), then weaves left/right and bobs
 *  up/down and in/out of depth down the length of the page. */
function FlyingGroup({ accent, pop }: { accent: string; pop: string }) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const TAU = Math.PI * 2;

  useFrame((state, delta) => {
    const p = scroll.current;
    if (group.current) {
      // Lissajous-ish flight path. cos(0)=1 → starts on the right like the hero.
      group.current.position.x = Math.cos(p * TAU * 2.1) * 2.6;
      group.current.position.y = Math.sin(p * TAU * 1.6) * 1.7;
      group.current.position.z = Math.sin(p * TAU * 1.15) * 0.9;
    }
    if (mesh.current) {
      const pt = state.pointer;
      mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, pt.x * 0.7, 0.06);
      mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, -pt.y * 0.7, 0.06);
      mesh.current.rotation.z += delta * 0.06;
    }
  });

  const spots: [number, number, number][] = [
    [2.0, 1.0, -0.5], [-2.1, -0.8, 0.4], [1.5, -1.3, 0.7], [-1.6, 1.4, -0.6], [0.2, 1.9, -1.1],
  ];

  return (
    <group ref={group}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.3, 20]} />
        <MeshDistortMaterial
          color={accent}
          distort={0.4}
          speed={2.1}
          roughness={0.22}
          metalness={0.45}
          envMapIntensity={0.9}
          emissive={pop}
          emissiveIntensity={0.45}
        />
      </mesh>
      {spots.map((pos, i) => (
        <Float key={i} speed={2 + i * 0.4} rotationIntensity={2.5} floatIntensity={2.2}>
          <mesh position={pos} scale={0.15 + (i % 3) * 0.05}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color={pop} metalness={0.4} roughness={0.25} emissive={pop} emissiveIntensity={0.6} />
          </mesh>
        </Float>
      ))}
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

/** Fixed, full-viewport WebGL layer that sits BEHIND the page content
 *  (pointer-events-none) so the blob flies around behind every section as you
 *  scroll. Pauses when the tab is hidden. */
export default function FlyingBlob() {
  const { accent, pop } = useThemeColors();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scroll.current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };
    const onVis = () => setVisible(!document.hidden);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVis);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0" style={{ zIndex: -5 }}>
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 4.8], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop={visible ? 'always' : 'never'}
        eventSource={typeof document !== 'undefined' ? document.documentElement : undefined}
        eventPrefix="client"
      >
        <ambientLight intensity={0.45} />
        <pointLight position={[5, 5, 5]} intensity={32} color={pop} />
        <pointLight position={[-5, -3, 2]} intensity={22} color={accent} />
        <Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.3}>
            <FlyingGroup accent={accent} pop={pop} />
          </Float>
          <Environment resolution={256}>
            <Lightformer intensity={2.4} position={[0, 3, 3]} scale={6} color={pop} />
            <Lightformer intensity={2.0} position={[-3, -1, 2]} scale={5} color={accent} />
            <Lightformer intensity={0.8} position={[3, 1, -2]} scale={5} color="#ffffff" />
          </Environment>
        </Suspense>
        <Rig />
        <EffectComposer>
          <Bloom mipmapBlur intensity={0.4} luminanceThreshold={0.72} luminanceSmoothing={0.2} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
