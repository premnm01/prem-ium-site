import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Every captured site (public/globe/<slug>.jpg). These are the tiles that
// wrap the sphere — the full set of sites we've built and given away.
const SLUGS = [
  'quesnack', 'bellam-kaaram', '8dxvb0', 'le73rr', 'kng0mz', 'fgogv2', 'fgpmte', 'is1f0b',
  'donrff-wph6', 'jsq05s-wph6', '0fsmj5-2f30', 'ehxw2s-jnx2', 'n85tjg-lkjr', 'cilr7a-wxd2',
  'y9hcyn-nhof', 'zw0omc-gn0d', '9bn8a1-6y5z', '52gos3', 'vbbr9o', 't39zoh', 'ld0y59', '1ywa4m',
  'm3kp7x', 'r1q447', 'h760o7', 'vk1b2p', 'uee4d4', 'lzg0s3',
];

function Tiles() {
  const group = useRef<THREE.Group>(null);
  const textures = useTexture(SLUGS.map((s) => `/globe/${s}.jpg`));

  const nodes = useMemo(() => {
    const N = SLUGS.length;
    const r = 2.35;
    const golden = Math.PI * (1 + Math.sqrt(5));
    const fwd = new THREE.Vector3(0, 0, 1);
    return SLUGS.map((_, i) => {
      // Fibonacci sphere — even point spread, no clustering at the poles.
      const phi = Math.acos(1 - (2 * (i + 0.5)) / N);
      const theta = golden * i;
      const dir = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.cos(phi),
        Math.sin(phi) * Math.sin(theta),
      );
      const tex = textures[i];
      if (tex) {
        tex.colorSpace = THREE.SRGBColorSpace; // screenshots are sRGB
        tex.anisotropy = 4;
      }
      return {
        pos: dir.clone().multiplyScalar(r),
        // orient the plane's +Z (its front) along `dir` so it faces outward
        quat: new THREE.Quaternion().setFromUnitVectors(fwd, dir),
        tex,
      };
    });
  }, [textures]);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.14; // steady auto-spin
    // gentle tilt toward the pointer for a hand-on-the-globe feel
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -state.pointer.y * 0.35 + 0.15,
      0.04,
    );
  });

  return (
    <group ref={group}>
      {nodes.map((n, i) => (
        <mesh key={i} position={n.pos} quaternion={n.quat}>
          <planeGeometry args={[0.92, 0.61]} />
          <meshBasicMaterial map={n.tex} side={THREE.DoubleSide} toneMapped={false} transparent />
        </mesh>
      ))}
    </group>
  );
}

export default function WorldGlobe() {
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  useEffect(() => {
    if (!wrap.current) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0.01 });
    io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="h-[420px] w-full md:h-[560px]">
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 42 }}
        dpr={[1, 1.6]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        frameloop={active ? 'always' : 'never'}
        eventSource={typeof document !== 'undefined' ? document.documentElement : undefined}
        eventPrefix="client"
      >
        <Tiles />
      </Canvas>
    </div>
  );
}
