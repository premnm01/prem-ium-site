import { useRef, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import { Button } from './ui/Button';
import AnimatedHeadline from './AnimatedHeadline';

const EASE = [0.22, 1, 0.36, 1] as const;

/** One depth plane: a blurred colored shape sitting at a fixed CSS z-depth
 *  (via the `z` motion prop — NOT a literal `transform` string, which
 *  Framer Motion silently overwrites whenever y/scale/rotate motion values
 *  are also present on the same element). Scroll and pointer position both
 *  drive its offset, each scaled by `factor` so the three planes visibly
 *  separate from one another — that separation IS the parallax. */
function DepthPlane({
  scrollYProgress,
  pointerX,
  pointerY,
  factor,
  z,
  size,
  blur,
  color,
  className = '',
  reduceMotion,
}: {
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  pointerX: ReturnType<typeof useMotionValue<number>>;
  pointerY: ReturnType<typeof useMotionValue<number>>;
  factor: number;
  z: number;
  size: number;
  blur: number;
  color: string;
  className?: string;
  reduceMotion: boolean | null;
}) {
  const scrollY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 260 * factor]);
  const scrollRotate = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 18 * factor]);
  const px = useTransform(pointerX, (v) => (reduceMotion ? 0 : v * 40 * factor));
  const py = useTransform(pointerY, (v) => (reduceMotion ? 0 : v * 40 * factor));

  return (
    <motion.div
      aria-hidden
      className={`fx-depth-layer pointer-events-none absolute rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: color,
        filter: `blur(${blur}px)`,
        z,
        y: scrollY,
        x: px,
        rotate: scrollRotate,
        translateY: py,
      }}
    />
  );
}

export default function Hero({
  eyebrow,
  headline,
  emphasize = [],
  sub,
  ctaLabel,
  ctaHref,
  ctaLabel2,
  ctaHref2,
}: {
  eyebrow?: string;
  headline: string;
  emphasize?: string[];
  sub?: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaLabel2?: string;
  ctaHref2?: string;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 60, damping: 20 });
  const springY = useSpring(pointerY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (reduceMotion) return;
    function onMove(e: PointerEvent) {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      pointerX.set(nx);
      pointerY.set(ny);
    }
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduceMotion]);

  // Foreground content lifts slightly toward the viewer while the whole
  // section scrolls past, reinforcing the depth separation from the planes.
  const contentY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -60]);

  return (
    <section
      ref={sectionRef}
      className="fx-perspective relative flex min-h-[92vh] items-center overflow-hidden px-6 py-24 text-center"
    >
      <div aria-hidden className="fx-depth-layer absolute inset-0">
        <DepthPlane
          scrollYProgress={scrollYProgress}
          pointerX={springX}
          pointerY={springY}
          factor={1}
          z={-320}
          size={520}
          blur={90}
          color="color-mix(in srgb, var(--accent) 55%, transparent)"
          className="left-[8%] top-[6%] opacity-60"
          reduceMotion={reduceMotion}
        />
        <DepthPlane
          scrollYProgress={scrollYProgress}
          pointerX={springX}
          pointerY={springY}
          factor={-0.6}
          z={-160}
          size={380}
          blur={70}
          color="color-mix(in srgb, var(--pop) 60%, transparent)"
          className="right-[10%] top-[18%] opacity-50"
          reduceMotion={reduceMotion}
        />
        <DepthPlane
          scrollYProgress={scrollYProgress}
          pointerX={springX}
          pointerY={springY}
          factor={1.4}
          z={-60}
          size={220}
          blur={40}
          color="color-mix(in srgb, var(--accent-d) 70%, transparent)"
          className="left-[38%] bottom-[8%] opacity-40"
          reduceMotion={reduceMotion}
        />
      </div>

      <motion.div className="fx-depth-layer relative mx-auto w-full max-w-4xl" style={{ y: contentY }}>
        {eyebrow && (
          <motion.p
            className="eyebrow mb-4"
            initial={reduceMotion ? undefined : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {eyebrow}
          </motion.p>
        )}

        <AnimatedHeadline
          as="h1"
          text={headline}
          emphasize={emphasize}
          className="mx-auto max-w-4xl text-5xl leading-[1.05] md:text-7xl"
        />

        {sub && (
          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg text-ink2"
            initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
          >
            {sub}
          </motion.p>
        )}

        {(ctaHref || ctaHref2) && (
          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
            initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45, ease: EASE }}
          >
            {ctaHref && (
              <a href={ctaHref}>
                <Button>{ctaLabel || 'Get started'}</Button>
              </a>
            )}
            {ctaHref2 && (
              <a href={ctaHref2}>
                <Button variant="ghost">{ctaLabel2 || 'Learn more'}</Button>
              </a>
            )}
          </motion.div>
        )}
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[3px] text-ink2"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0]) }}
      >
        Scroll ↓
      </motion.div>
    </section>
  );
}
