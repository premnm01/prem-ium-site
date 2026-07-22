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
 *  section and drifts on scroll — reinforcing the parallax depth).
 *
 *  The scroll drift is deliberately SMALL (±~70px). The layer is fixed, so a
 *  large drift would push the blobs out of the viewport as you scroll and the
 *  glow would vanish (the "it just disappears" bug). Small drift keeps a glow
 *  on screen the whole way down while still parallaxing. Blobs are spread
 *  across the viewport (top/left) so there's always coverage. */
export default function AmbientBlobs() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <Blob progress={scrollYProgress} from={-40} to={70} left="-6%" top="4%" size={620} color="rgb(var(--accent-rgb) / 0.22)" delay={0} reduce={reduce} />
      <Blob progress={scrollYProgress} from={60} to={-50} left="60%" top="8%" size={520} color="rgb(var(--pop-rgb) / 0.18)" delay={4} reduce={reduce} />
      <Blob progress={scrollYProgress} from={-70} to={60} left="28%" top="42%" size={700} color="rgb(var(--accent-rgb) / 0.16)" delay={8} reduce={reduce} />
      <Blob progress={scrollYProgress} from={50} to={-70} left="70%" top="55%" size={560} color="rgb(var(--pop-rgb) / 0.20)" delay={2} reduce={reduce} />
      <Blob progress={scrollYProgress} from={-60} to={60} left="2%" top="70%" size={600} color="rgb(var(--accent-d-rgb) / 0.20)" delay={6} reduce={reduce} />
    </div>
  );
}
