import { useRef } from 'react';
import { useMotionValue, useSpring, useTransform, useReducedMotion, type MotionValue } from 'framer-motion';

/** Pointer-follow 3D tilt. Ports the vanilla pointer-tilt math (px/py from
 *  cursor position within the element) into Framer Motion values with
 *  spring smoothing. Returns a ref to attach plus motion values for
 *  rotateX/rotateY/perspective, plus a derived `shadow` box-shadow string
 *  that shifts opposite the tilt — a card lifting toward the light reads
 *  far more like real 3D than rotation alone. No-ops (flat) under
 *  prefers-reduced-motion. */
export function useTilt(strength = 10) {
  const ref = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const rotateX = useSpring(useMotionValue(0), { stiffness: 260, damping: 24 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 260, damping: 24 });
  const shadow = useTransform([rotateX, rotateY], ([rx, ry]: number[]) => {
    const ox = -(ry / strength) * 24;
    const oy = (rx / strength) * 24;
    return `${ox}px ${16 + Math.abs(oy)}px ${28 + Math.abs(ox) + Math.abs(oy)}px -12px rgb(0 0 0 / 0.35)`;
  });

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

  return { ref, rotateX, rotateY, shadow, onPointerMove, onPointerLeave } as {
    ref: React.RefObject<HTMLElement>;
    rotateX: MotionValue<number>;
    rotateY: MotionValue<number>;
    shadow: MotionValue<string>;
    onPointerMove: (e: React.PointerEvent) => void;
    onPointerLeave: () => void;
  };
}
