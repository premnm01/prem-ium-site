import { motion, useReducedMotion } from 'framer-motion';
import { Badge } from './ui/Badge';
import { useTilt } from '../lib/useTilt';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function SiteCard({
  business,
  city,
  category,
  renderUrl,
  whyFree,
  i = 0,
  variant = 'work',
}: {
  business: string;
  city: string;
  category: string;
  renderUrl: string;
  whyFree?: string;
  i?: number;
  variant?: 'work' | 'charity';
}) {
  const reduceMotion = useReducedMotion();
  const tilt = useTilt(22);

  return (
    <motion.div
      ref={tilt.ref as any}
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
      initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      whileHover={reduceMotion ? undefined : { scale: 1.05, z: 50 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
      style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformPerspective: 700, boxShadow: tilt.shadow }}
      className={`fx-depth-layer flex flex-col rounded-lg bg-card p-6 ring-1 ${
        variant === 'charity' ? 'ring-pop/30' : 'ring-ink/10'
      }`}
    >
      <Badge>{category}</Badge>
      <h3 className="mt-4 text-lg font-semibold">{business}</h3>
      <p className="mb-3 text-sm text-ink2">{city}</p>
      {whyFree && <p className="mb-4 text-sm text-ink2 opacity-80">{whyFree}</p>}
      <a
        href={renderUrl}
        target="_blank"
        rel="noopener"
        className="mt-auto inline-flex items-center justify-center rounded-btn bg-accent px-4 py-2 text-sm font-medium text-white shadow-soft transition-transform hover:-translate-y-0.5"
      >
        View live site ↗
      </a>
    </motion.div>
  );
}
