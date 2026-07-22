import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Per-word stagger-rise headline, with optional emphasis words rendered in
 *  a gradient knockout (accent → pop). Reused for the hero H1 and every
 *  section's H2 so text motion reads as one consistent system. */
export default function AnimatedHeadline({
  text,
  emphasize = [],
  as: Tag = 'h2',
  className = '',
  delayStart = 0,
}: {
  text: string;
  emphasize?: string[];
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  delayStart?: number;
}) {
  const reduceMotion = useReducedMotion();
  const words = text.split(' ');

  const content = (
    <Tag className={className}>
      {words.map((w, i) => {
        const bare = w.replace(/[.,!?]/g, '');
        const isEmphasis = emphasize.includes(bare);
        return (
          <motion.span
            key={i}
            className={`inline-block ${isEmphasis ? 'fx-textgrad' : ''}`}
            initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: delayStart + i * 0.06, ease: EASE }}
          >
            {w}&nbsp;
          </motion.span>
        );
      })}
    </Tag>
  );

  return content;
}
