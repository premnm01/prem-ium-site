import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Lightformer, MeshDistortMaterial } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// Per-section flight waypoints (scene units). The blob eases toward the
// waypoint of whichever section is centred in the viewport. Work (the
// waterfall) is dead centre by request; the others send it side to side.
const WAYPOINTS = [
  { id: 'top', x: 2.6, y: 0.0, z: 0.2 },
  { id: 'about', x: -2.6, y: 0.4, z: -0.3 },
  { id: 'work', x: 0.0, y: 0.0, z: 0.6 }, // waterfall → middle
  { id: 'charity', x: 2.4, y: 0.3, z: -0.2 },
  { id: 'services', x: -2.3, y: 0.2, z: 0.3 },
  { id: 'contact', x: 0.0, y: -0.2, z: 0.0 },
];

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

/** The blob + its orbiting shards. It glides between per-section waypoints:
 *
 *  - CONSTANT SPEED: the visible position moves toward its target at a capped
 *    units/sec, so fast scrolling never whips it across the screen — it just
 *    keeps gliding (and lags behind, catching up smoothly). Decoupled from
 *    scroll velocity entirely.
 *  - PULLBACK: when the cursor is over the blob it recoils away from the
 *    pointer and shrinks slightly, like poking something soft. */
function FlyingGroup({ accent, pop }: { accent: string; pop: string }) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);

  // Cached section elements for the waypoints (looked up once after mount).
  const els = useRef<{ el: HTMLElement; wp: (typeof WAYPOINTS)[number] }[]>([]);
  useEffect(() => {
    els.current = WAYPOINTS.map((wp) => ({ el: document.getElementById(wp.id)!, wp })).filter((e) => e.el);
  }, []);

  const base = useRef(new THREE.Vector3(2.6, 0, 0.2)); // smoothed glide position
  const target = useRef(new THREE.Vector3(2.6, 0, 0.2));
  const repel = useRef(new THREE.Vector2(0, 0));
  const pull = useRef(0);
  const MAX_SPEED = 3.4; // scene-units / second — the constant glide cap

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.05); // clamp for tab-refocus spikes
    const items = els.current;

    // 1) target = waypoint of whichever section is centred in the viewport
    if (items.length) {
      const vc = window.scrollY + window.innerHeight / 2;
      const centers = items.map(({ el, wp }) => {
        const r = el.getBoundingClientRect();
        return { c: r.top + window.scrollY + r.height / 2, wp };
      });
      let tx = centers[0].wp.x, ty = centers[0].wp.y, tz = centers[0].wp.z;
      if (vc >= centers[centers.length - 1].c) {
        const last = centers[centers.length - 1].wp; tx = last.x; ty = last.y; tz = last.z;
      } else {
        for (let i = 0; i < centers.length - 1; i++) {
          if (vc >= centers[i].c && vc < centers[i + 1].c) {
            const t = (vc - centers[i].c) / (centers[i + 1].c - centers[i].c);
            const a = centers[i].wp, b = centers[i + 1].wp;
            tx = THREE.MathUtils.lerp(a.x, b.x, t);
            ty = THREE.MathUtils.lerp(a.y, b.y, t);
            tz = THREE.MathUtils.lerp(a.z, b.z, t);
            break;
          }
        }
      }
      target.current.set(tx, ty, tz);
    }

    // 2) glide `base` toward target at a constant capped speed (the "lag")
    const toTarget = target.current.clone().sub(base.current);
    const dist = toTarget.length();
    const step = MAX_SPEED * d;
    if (dist > 1e-4) base.current.add(toTarget.multiplyScalar(Math.min(step, dist) / dist));

    // 3) pullback: recoil away from the cursor when it's over the blob
    if (group.current) {
      const screen = base.current.clone().project(state.camera); // NDC
      const dx = state.pointer.x - screen.x;
      const dy = state.pointer.y - screen.y;
      const pd = Math.hypot(dx, dy);
      const R = 0.55;
      let rx = 0, ry = 0, p = 0;
      if (pd < R && pd > 1e-4) {
        p = (R - pd) / R;
        rx = (-dx / pd) * p * 0.9; // push opposite the cursor
        ry = (-dy / pd) * p * 0.9;
      }
      repel.current.x = THREE.MathUtils.lerp(repel.current.x, rx, 0.15);
      repel.current.y = THREE.MathUtils.lerp(repel.current.y, ry, 0.15);
      pull.current = THREE.MathUtils.lerp(pull.current, p, 0.15);
      group.current.position.set(base.current.x + repel.current.x, base.current.y + repel.current.y, base.current.z);
    }

    if (mesh.current) {
      const pt = state.pointer;
      mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, pt.x * 0.7, 0.06);
      mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, -pt.y * 0.7, 0.06);
      mesh.current.rotation.z += d * 0.06;
      const scl = 1 - pull.current * 0.2; // shrink on pullback
      mesh.current.scale.setScalar(THREE.MathUtils.lerp(mesh.current.scale.x, scl, 0.2));
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
    const onVis = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
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
          <FlyingGroup accent={accent} pop={pop} />
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
