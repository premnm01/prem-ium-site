import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Services({ items }: { items: { title: string; body: string }[] }) {
  const reduceMotion = useReducedMotion();
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {items.map((f, i) => (
        <motion.div
          key={f.title}
          initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
          className="rounded-lg bg-card p-6 shadow-soft ring-1 ring-ink/5"
        >
          <h3 className="mb-2 text-xl">{f.title}</h3>
          <p className="text-ink2">{f.body}</p>
        </motion.div>
      ))}
    </div>
  );
}
