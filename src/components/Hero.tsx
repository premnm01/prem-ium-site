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

/** One depth plane: a soft radial-gradient glow (NOT a solid shape behind a
 *  CSS `filter: blur()`) — a blurred, scroll/pointer-animated element forces
 *  the browser to re-rasterize the blur every frame, which is what made the
 *  original version laggy. A radial gradient achieves the same soft-glow
 *  look as a pure background composite: cheap, GPU-friendly, no filter. */
function GlowPlane({
  scrollYProgress,
  pointerX,
  pointerY,
  factor,
  z,
  size,
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
  color: string;
  className?: string;
  reduceMotion: boolean | null;
}) {
  const scrollY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 260 * factor]);
  const px = useTransform(pointerX, (v) => (reduceMotion ? 0 : v * 50 * factor));
  const py = useTransform(pointerY, (v) => (reduceMotion ? 0 : v * 50 * factor));

  return (
    <motion.div
      aria-hidden
      className={`fx-depth-layer pointer-events-none absolute rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        z,
        y: scrollY,
        x: px,
        translateY: py,
      }}
    />
  );
}

/** A sharp-edged floating chip — gives the eye a hard reference edge so the
 *  soft glows behind it actually read as "behind," not just as background
 *  texture. Tilts opposite the foreground text on pointer move, and floats
 *  independently on scroll — the clearest single "this is 3D" cue on the
 *  page. */
function FloatingChip({
  scrollYProgress,
  pointerX,
  pointerY,
  reduceMotion,
}: {
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  pointerX: ReturnType<typeof useMotionValue<number>>;
  pointerY: ReturnType<typeof useMotionValue<number>>;
  reduceMotion: boolean | null;
}) {
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-40, 220]);
  const rotate = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-8, 10]);
  const rotateY = useTransform(pointerX, (v) => (reduceMotion ? 0 : v * -30));
  const rotateX = useTransform(pointerY, (v) => (reduceMotion ? 0 : v * 20));

  return (
    <motion.div
      aria-hidden
      className="fx-depth-layer pointer-events-none absolute right-[12%] top-[20%] hidden h-24 w-24 rounded-2xl border md:block lg:h-32 lg:w-32"
      style={{
        z: 80,
        y,
        rotate,
        rotateX,
        rotateY,
        transformPerspective: 600,
        borderColor: 'rgb(var(--pop-rgb) / 0.4)',
        background: 'linear-gradient(135deg, rgb(var(--accent-rgb) / 0.35), rgb(var(--pop-rgb) / 0.35))',
        boxShadow: '0 30px 60px -20px rgb(var(--accent-rgb) / 0.4)',
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
  const springX = useSpring(pointerX, { stiffness: 80, damping: 22 });
  const springY = useSpring(pointerY, { stiffness: 80, damping: 22 });

  useEffect(() => {
    if (reduceMotion) return;
    let raf = 0;
    function onMove(e: PointerEvent) {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        pointerX.set(e.clientX / window.innerWidth - 0.5);
        pointerY.set(e.clientY / window.innerHeight - 0.5);
      });
    }
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  // Foreground content tilts opposite the pointer and lifts slightly on
  // scroll — real perspective foreshortening on the text itself, which
  // reads as "3D" far more clearly than a moving background ever does.
  const contentY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -60]);
  const contentRotateY = useTransform(pointerX, (v) => (reduceMotion ? 0 : v * 10));
  const contentRotateX = useTransform(pointerY, (v) => (reduceMotion ? 0 : v * -8));

  return (
    <section
      ref={sectionRef}
      className="fx-perspective relative flex min-h-[92vh] items-center overflow-hidden px-6 py-24 text-center"
    >
      <div aria-hidden className="fx-depth-layer absolute inset-0">
        <GlowPlane
          scrollYProgress={scrollYProgress}
          pointerX={springX}
          pointerY={springY}
          factor={1}
          z={-320}
          size={640}
          color="rgb(var(--accent-rgb) / 0.55)"
          className="left-[2%] top-0 opacity-70"
          reduceMotion={reduceMotion}
        />
        <GlowPlane
          scrollYProgress={scrollYProgress}
          pointerX={springX}
          pointerY={springY}
          factor={-0.6}
          z={-160}
          size={460}
          color="rgb(var(--pop-rgb) / 0.6)"
          className="right-[4%] top-[10%] opacity-60"
          reduceMotion={reduceMotion}
        />
        <FloatingChip
          scrollYProgress={scrollYProgress}
          pointerX={springX}
          pointerY={springY}
          reduceMotion={reduceMotion}
        />
      </div>

      <motion.div
        className="fx-depth-layer relative mx-auto w-full max-w-4xl"
        style={{
          y: contentY,
          rotateX: contentRotateX,
          rotateY: contentRotateY,
          transformPerspective: 1200,
        }}
      >
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
