import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Lightformer, MeshDistortMaterial } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// Hero scroll progress (0 at top → 1 one viewport down), written by a passive
// scroll listener and read inside useFrame so the object drifts on scroll
// without React re-renders.
const scroll = { current: 0 };

/** Turns a "r g b" custom-prop triple (e.g. "63 107 74") into a #hex string
 *  THREE.Color can parse. We must read the raw --accent-rgb triples, NOT
 *  --accent: the latter is defined as `rgb(var(--accent-rgb))`, an
 *  unresolved var() string that THREE.Color can't parse and silently
 *  defaults to white — which is why the blob rendered white regardless of
 *  theme. */
function tripleToHex(triple: string, fallback: string): string {
  const parts = triple.trim().split(/\s+/).map(Number);
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return fallback;
  return '#' + parts.map((n) => Math.max(0, Math.min(255, n)).toString(16).padStart(2, '0')).join('');
}

/** Reads the theme's accent/pop off :root so the 3D object recolors live when
 *  the theme switcher flips [data-theme]. */
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

/** The main object: a high-tessellation icosahedron with a distort material
 *  (organic liquid-metal morph). Rotates toward the pointer and drifts down
 *  as the hero scrolls away. */
function Blob({ color, glow }: { color: string; glow: string }) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (!mesh.current) return;
    const p = state.pointer;
    mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, p.x * 0.7, 0.06);
    mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, -p.y * 0.7, 0.06);
    mesh.current.rotation.z += delta * 0.06;
    mesh.current.position.y = -scroll.current * 1.6;
  });
  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.35, 20]} />
      {/* base = accent, but the readable color comes from a strong emissive
          in the brighter `pop` tone: emissive glows independent of lighting,
          so the blob reads clearly themed against black instead of washing
          out to a grey chrome ball under the specular highlights. */}
      <MeshDistortMaterial
        color={color}
        distort={0.4}
        speed={2.1}
        roughness={0.22}
        metalness={0.45}
        envMapIntensity={0.9}
        emissive={glow}
        emissiveIntensity={0.42}
      />
    </mesh>
  );
}

/** Small faceted crystals orbiting the blob for extra depth / "crazy" energy. */
function Shards({ color }: { color: string }) {
  const spots: [number, number, number][] = [
    [2.2, 1.1, -0.5],
    [-2.4, -0.8, 0.4],
    [1.6, -1.4, 0.8],
    [-1.8, 1.5, -0.6],
    [0.2, 2.1, -1.2],
  ];
  return (
    <>
      {spots.map((pos, i) => (
        <Float key={i} speed={2 + i * 0.4} rotationIntensity={2.5} floatIntensity={2.2}>
          <mesh position={pos} scale={0.16 + (i % 3) * 0.05}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color={color}
              metalness={0.4}
              roughness={0.25}
              emissive={color}
              emissiveIntensity={0.6}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

/** Parallax camera rig — the camera itself leans with the pointer (real
 *  perspective shift, not just object rotation) and pulls back slightly on
 *  scroll. */
function Rig() {
  useFrame((state) => {
    const { camera, pointer } = state;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 1.4, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.9 + scroll.current * 0.6, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 4.6 + scroll.current * 1.2, 0.05);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroCanvas() {
  const { accent, pop } = useThemeColors();
  const wrapRef = useRef<HTMLDivElement>(null);
  // Pause the render loop when the hero is scrolled out of view — no GPU work
  // spent while the rest of the page is on screen.
  const [active, setActive] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      scroll.current = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    let io: IntersectionObserver | null = null;
    if (wrapRef.current) {
      io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0.01 });
      io.observe(wrapRef.current);
    }
    return () => {
      window.removeEventListener('scroll', onScroll);
      io?.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} className="h-[440px] w-full md:h-[560px]">
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 4.6], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop={active ? 'always' : 'never'}
        eventSource={typeof document !== 'undefined' ? document.documentElement : undefined}
        eventPrefix="client"
      >
        <ambientLight intensity={0.45} />
        <pointLight position={[5, 5, 5]} intensity={32} color={pop} />
        <pointLight position={[-5, -3, 2]} intensity={22} color={accent} />
        <Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.3}>
            <Blob color={accent} glow={pop} />
          </Float>
          <Shards color={pop} />
          {/* Self-contained env map from light cards — no external HDR fetch.
              Tinted with the theme colors (not white) so reflections carry
              the palette rather than blowing the surface out to chrome. */}
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
