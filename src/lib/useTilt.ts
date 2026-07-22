import { useRef } from 'react';
import { useMotionValue, useSpring, useReducedMotion, type MotionValue } from 'framer-motion';

/** Pointer-follow 3D tilt. Ports the vanilla pointer-tilt math (px/py from
 *  cursor position within the element) into Framer Motion values with
 *  spring smoothing. Returns a ref plus rotateX/rotateY motion values.
 *
 *  IMPORTANT: only drives `transform` (rotateX/rotateY) — which the browser
 *  composites on the GPU with zero repaint. An earlier version also animated
 *  a per-frame `box-shadow`, which forces a full repaint every pointer move
 *  and was a real source of the reported lag; the depth cue now comes from a
 *  static CSS shadow + the transform tilt alone. No-ops under
 *  prefers-reduced-motion. */
export function useTilt(strength = 10) {
  const ref = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const rotateX = useSpring(useMotionValue(0), { stiffness: 260, damping: 24 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 260, damping: 24 });

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
