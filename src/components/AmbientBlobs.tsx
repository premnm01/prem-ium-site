import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'framer-motion';

/** One drifting glow. The scroll-linked parallax `y` lives on the OUTER
 *  motion.div; the slow organic float (CSS `ambientFloat`) lives on the INNER
 *  div — two elements so the two transforms never fight (same lesson as the
 *  gallery hover fix). Colour comes from the theme's accent/pop vars, so the
 *  blobs recolour with the palette. */
function Blob({
  progress,
  from,
  to,
  left,
  top,
  size,
  color,
  delay,
  reduce,
}: {
  progress: MotionValue<number>;
  from: number;
  to: number;
  left: string;
  top: string;
  size: number;
  color: string;
  delay: number;
  reduce: boolean | null;
}) {
  const y = useTransform(progress, [0, 1], reduce ? [0, 0] : [from, to]);
  return (
    <motion.div className="absolute" style={{ left, top, y }}>
      <div
        className="ambient-blob"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle, ${color} 0%, transparent 68%)`,
          animationDelay: `${delay}s`,
        }}
      />
    </motion.div>
  );
}

/** Full-page fixed layer of glowing blobs sitting behind all content (the
 *  sections above it are translucent, so the glow bleeds through every
 *  section and drifts on scroll — reinforcing the parallax depth). */
export default function AmbientBlobs() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <Blob progress={scrollYProgress} from={-80} to={220} left="-6%" top="6%" size={620} color="rgb(var(--accent-rgb) / 0.20)" delay={0} reduce={reduce} />
      <Blob progress={scrollYProgress} from={120} to={-200} left="62%" top="0%" size={520} color="rgb(var(--pop-rgb) / 0.16)" delay={4} reduce={reduce} />
      <Blob progress={scrollYProgress} from={-160} to={160} left="30%" top="40%" size={700} color="rgb(var(--accent-rgb) / 0.14)" delay={8} reduce={reduce} />
      <Blob progress={scrollYProgress} from={80} to={-260} left="72%" top="60%" size={560} color="rgb(var(--pop-rgb) / 0.18)" delay={2} reduce={reduce} />
      <Blob progress={scrollYProgress} from={-120} to={260} left="4%" top="72%" size={600} color="rgb(var(--accent-d-rgb) / 0.18)" delay={6} reduce={reduce} />
    </div>
  );
}
