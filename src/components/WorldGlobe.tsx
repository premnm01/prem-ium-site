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

// More tile slots than we have screenshots, so the sphere is fully wrapped —
// textures repeat (offset each lap so neighbours aren't identical).
const TILE_COUNT = 84;
const RADIUS = 2.35;

function Tiles() {
  const group = useRef<THREE.Group>(null);
  const textures = useTexture(SLUGS.map((s) => `/globe/${s}.jpg`));

  const nodes = useMemo(() => {
    const N = TILE_COUNT;
    const golden = Math.PI * (1 + Math.sqrt(5));
    const fwd = new THREE.Vector3(0, 0, 1);
    return Array.from({ length: N }, (_, i) => {
      // Fibonacci sphere — even point spread, no clustering at the poles.
      const phi = Math.acos(1 - (2 * (i + 0.5)) / N);
      const theta = golden * i;
      const dir = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.cos(phi),
        Math.sin(phi) * Math.sin(theta),
      );
      // spread repeats so the same shot doesn't sit next to itself
      const tex = textures[(i * 7 + Math.floor(i / textures.length)) % textures.length];
      if (tex) {
        tex.colorSpace = THREE.SRGBColorSpace; // screenshots are sRGB
        tex.anisotropy = 4;
      }
      return {
        pos: dir.clone().multiplyScalar(RADIUS),
        // orient the plane's +Z (its front) along `dir` so it faces outward
        quat: new THREE.Quaternion().setFromUnitVectors(fwd, dir),
        tex,
      };
    });
  }, [textures]);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.13; // steady auto-spin
    // gentle tilt toward the pointer for a hand-on-the-globe feel
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -state.pointer.y * 0.3 + 0.12,
      0.04,
    );
  });

  return (
    <group ref={group}>
      {/* Opaque backing sphere just under the tiles — any gap between tiles
          reads as the dark globe surface instead of showing straight through
          to the tiles on the far side. */}
      <mesh>
        <sphereGeometry args={[RADIUS - 0.14, 48, 48]} />
        <meshBasicMaterial color="#0a0d0c" toneMapped={false} />
      </mesh>
      {nodes.map((n, i) => (
        <mesh key={i} position={n.pos} quaternion={n.quat}>
          <planeGeometry args={[0.86, 0.57]} />
          {/* FrontSide: far-hemisphere tiles face away and cull, leaving the
              backing sphere — cheaper and reads as a solid globe. */}
          <meshBasicMaterial map={n.tex} side={THREE.FrontSide} toneMapped={false} />
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
