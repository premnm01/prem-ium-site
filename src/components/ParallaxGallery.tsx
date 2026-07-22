import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'framer-motion';
import type { GalleryShot } from '../data/gallery';

/** A single site "window": the screenshot in a faux browser chrome frame
 *  (traffic-light dots + address bar). The whole frame is a link to the
 *  live site and lifts on hover. */
function SiteWindow({ shot, y }: { shot: GalleryShot; y: MotionValue<number> }) {
  const host = (() => {
    try {
      const u = new URL(shot.url);
      // Show a clean vanity host rather than the long portal path.
      return `${shot.business.toLowerCase().replace(/[^a-z0-9]+/g, '')}.prem-ium.inc`;
    } catch {
      return 'prem-ium.inc';
    }
  })();

  return (
    <motion.a
      href={shot.url}
      target="_blank"
      rel="noopener"
      style={{ y }}
      whileHover={{ y: -8, scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      className="group block overflow-hidden rounded-xl border border-white/10 bg-[#0d0f12] shadow-2xl ring-1 ring-black/40"
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-3 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <div className="ml-2 flex-1 truncate rounded-md bg-black/30 px-3 py-1 text-[11px] text-white/40">
          {host}
        </div>
        {shot.featured && (
          <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
            Featured
          </span>
        )}
      </div>
      {/* Screenshot */}
      <div className="relative overflow-hidden">
        <img
          src={shot.img}
          alt={`${shot.business} website`}
          loading="lazy"
          className="block w-full transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {/* Caption overlay on hover */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div>
            <div className="text-sm font-semibold text-white">{shot.business}</div>
            <div className="text-xs text-white/60">{shot.category}</div>
          </div>
          <span className="whitespace-nowrap text-xs font-medium text-accent">Visit ↗</span>
        </div>
      </div>
    </motion.a>
  );
}

/** One vertical column of windows that drifts as the section scrolls past.
 *  `speed` sets both direction and magnitude — different speeds per column
 *  give the multi-layer parallax (adjacent columns visibly separate). */
function Column({
  shots,
  speed,
  progress,
  reduceMotion,
}: {
  shots: GalleryShot[];
  speed: number;
  progress: MotionValue<number>;
  reduceMotion: boolean | null;
}) {
  const y = useTransform(progress, [0, 1], reduceMotion ? [0, 0] : [speed, -speed]);
  return (
    <div className="flex flex-col gap-6">
      {shots.map((shot) => (
        <SiteWindow key={shot.img} shot={shot} y={y} />
      ))}
    </div>
  );
}

export default function ParallaxGallery({ shots }: { shots: GalleryShot[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Distribute into 3 columns round-robin so featured (first two) land in the
  // top row across different columns. Middle column starts lower + moves the
  // opposite way for the strongest depth read.
  const cols: GalleryShot[][] = [[], [], []];
  shots.forEach((s, i) => cols[i % 3].push(s));

  // Single shared (static) y for the mobile column — one hook, not one per
  // item, so we never call useTransform inside a map.
  const noY = useTransform(scrollYProgress, [0, 1], [0, 0]);

  return (
    <div ref={ref} className="relative">
      {/* Desktop: 3 parallax columns. */}
      <div className="hidden gap-6 md:grid md:grid-cols-3">
        <Column shots={cols[0]} speed={90} progress={scrollYProgress} reduceMotion={reduceMotion} />
        <div className="mt-16">
          <Column shots={cols[1]} speed={-70} progress={scrollYProgress} reduceMotion={reduceMotion} />
        </div>
        <Column shots={cols[2]} speed={120} progress={scrollYProgress} reduceMotion={reduceMotion} />
      </div>

      {/* Mobile: single column, no parallax (respects scroll expectations). */}
      <div className="flex flex-col gap-6 md:hidden">
        {shots.map((shot) => (
          <SiteWindow key={shot.img} shot={shot} y={noY} />
        ))}
      </div>
    </div>
  );
}
