import { useRef } from 'react';
import { useMotionValue, useSpring, useReducedMotion, type MotionValue } from 'framer-motion';

/** Pointer-follow 3D tilt. Ports the vanilla pointer-tilt math (px/py from
 *  cursor position within the element) into Framer Motion values with
 *  spring smoothing. Returns a ref to attach plus motion values for
 *  rotateX/rotateY/perspective. No-ops (flat) under prefers-reduced-motion. */
export function useTilt(strength = 10) {
  const ref = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const rotateX = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });

  function onPointerMove(e: React.PointerEvent) {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * strength);
    rotateX.set(-py * strength);
  }

  function onPointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return { ref, rotateX, rotateY, onPointerMove, onPointerLeave } as {
    ref: React.RefObject<HTMLElement>;
    rotateX: MotionValue<number>;
    rotateY: MotionValue<number>;
    onPointerMove: (e: React.PointerEvent) => void;
    onPointerLeave: () => void;
  };
}
