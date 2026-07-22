import { useEffect } from 'react';
import Lenis from 'lenis';

/** Mounts Lenis's inertial smooth-scroll physics globally — this is what
 *  makes scroll-linked parallax read as premium instead of stock browser
 *  scroll. Adapted from VengenceUI's smooth-scroll.tsx. Renders no DOM of
 *  its own; drop it anywhere on the page. No-ops under prefers-reduced-
 *  motion (native scroll stays instant/accessible). */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  return null;
}
