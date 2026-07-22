import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import AnimatedHeadline from './AnimatedHeadline';
import { useTilt } from '../lib/useTilt';

export default function About({
  eyebrow,
  headline,
  emphasize = [],
  paragraphs,
}: {
  eyebrow?: string;
  headline: string;
  emphasize?: string[];
  paragraphs: string[];
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  // Portrait card moves at a different rate than the text column — 2-layer parallax.
  const cardY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-100, 100]);
  const cardRotate = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-6, 6]);
  const tilt = useTilt(24);

  return (
    <section id="about" ref={sectionRef} className="relative px-6 py-24" style={{ background: 'rgb(var(--bg-rgb) / 0.85)' }}>
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <div>
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          <AnimatedHeadline as="h2" text={headline} emphasize={emphasize} className="mb-6 text-3xl text-ink md:text-4xl" />
          {paragraphs.map((p, i) => (
            <motion.p
              key={i}
              className="mb-4 text-ink2"
              initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              {p}
            </motion.p>
          ))}
        </div>

        <motion.div className="fx-perspective" style={{ y: cardY, rotate: cardRotate }}>
          <motion.div
            ref={tilt.ref as any}
            onPointerMove={tilt.onPointerMove}
            onPointerLeave={tilt.onPointerLeave}
            whileHover={reduceMotion ? undefined : { scale: 1.04 }}
            style={{
              rotateX: tilt.rotateX,
              rotateY: tilt.rotateY,
              transformPerspective: 700,
            }}
            className="fx-depth-layer flex aspect-square items-center justify-center rounded-lg bg-card p-10 shadow-lift ring-1 ring-ink/10"
          >
            <div
              className="display flex h-full w-full items-center justify-center rounded text-6xl font-semibold"
              style={{
                background: 'linear-gradient(135deg, var(--accent), var(--pop))',
                color: '#fff',
                boxShadow: '0 30px 60px -20px rgb(var(--accent-rgb) / 0.5)',
              }}
            >
              P
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
