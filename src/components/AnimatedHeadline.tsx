import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Per-word stagger-rise headline. Words in `emphasize` get the gradient
 *  knockout (accent → pop); words in `outline` get the hollow outline/stroke
 *  treatment (transparent fill) so they read as negative space and pop.
 *  Reused for the hero H1 and every section's H2 so text motion reads as one
 *  consistent system. */
export default function AnimatedHeadline({
  text,
  emphasize = [],
  outline = [],
  as: Tag = 'h2',
  className = '',
  delayStart = 0,
}: {
  text: string;
  emphasize?: string[];
  outline?: string[];
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
        const fx = emphasize.includes(bare) ? 'fx-textgrad' : outline.includes(bare) ? 'fx-outline' : '';
        return (
          <motion.span
            key={i}
            className={`inline-block ${fx}`}
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
