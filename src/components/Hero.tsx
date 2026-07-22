import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Button } from './ui/Button';
import AnimatedHeadline from './AnimatedHeadline';

const EASE = [0.22, 1, 0.36, 1] as const;

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

  // Background layer drifts down and grows as the user scrolls past — a
  // classic parallax retreat, given depth via translateZ + perspective.
  const bgY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 120]);
  const bgScale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [1, 1.15]);

  return (
    <section
      ref={sectionRef}
      className="fx-perspective relative overflow-hidden px-6 py-28 text-center md:py-40"
    >
      <motion.div
        aria-hidden
        className="fx-depth-layer pointer-events-none absolute inset-[-10%]"
        style={{
          y: bgY,
          scale: bgScale,
          transform: 'translateZ(-200px)',
          background:
            'radial-gradient(60% 50% at 50% 0%, color-mix(in srgb, var(--accent) 22%, transparent) 0%, transparent 70%), radial-gradient(40% 40% at 80% 30%, color-mix(in srgb, var(--pop) 20%, transparent) 0%, transparent 70%)',
        }}
      />

      {eyebrow && (
        <motion.p
          className="eyebrow relative mb-4"
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
        className="relative mx-auto max-w-4xl text-5xl leading-[1.05] md:text-7xl"
      />

      {sub && (
        <motion.p
          className="relative mx-auto mt-6 max-w-2xl text-lg text-ink2"
          initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
        >
          {sub}
        </motion.p>
      )}

      {(ctaHref || ctaHref2) && (
        <motion.div
          className="relative mt-8 flex flex-wrap items-center justify-center gap-3"
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
    </section>
  );
}
