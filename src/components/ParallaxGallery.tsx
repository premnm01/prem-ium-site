import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'framer-motion';
import type { GalleryShot } from '../data/gallery';

/** A single site "window": the screenshot in a faux browser chrome frame
 *  (traffic-light dots + address bar). The whole frame is a link to the
 *  live site and lifts on hover.
 *
 *  The parallax `y` and the hover lift live on SEPARATE elements on purpose:
 *  putting both on one element (style.y + whileHover.y) makes them fight for
 *  the same transform channel — the scroll value and the -8px lift overwrite
 *  each other every frame, which is the up/down "glitch". Here the OUTER
 *  element owns the scroll `y` and detects hover (it never moves FROM hover,
 *  so hovering can't move it out from under the cursor and re-trigger), while
 *  a stable INNER element does the lift + scale. */
function SiteWindow({ shot, y }: { shot: GalleryShot; y: MotionValue<number> }) {
  const [hovered, setHovered] = useState(false);
  const host = `${shot.business.toLowerCase().replace(/[^a-z0-9]+/g, '')}.prem-ium.inc`;

  return (
    <motion.a
      href={shot.url}
      target="_blank"
      rel="noopener"
      style={{ y }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group block"
    >
      <motion.div
        animate={hovered ? { y: -8, scale: 1.015 } : { y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
        className="overflow-hidden rounded-xl border border-white/10 bg-[#0d0f12] shadow-2xl ring-1 ring-black/40"
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
      </motion.div>
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

/** The pinned centre text of the waterfall. Sticky at ~34vh from the top so
 *  it holds its place for (column height − text height) of scroll — i.e. it
 *  stays put through nearly the whole section while the side windows flow
 *  past, then releases near the end. (A full-height sticky block would pin
 *  for only a short range and slide away too soon.) `self-start` keeps the
 *  grid cell from stretching the sticky block to the row height. */
function CentreText() {
  return (
    <div className="sticky top-[34vh] self-start px-2 text-center">
      <p className="eyebrow mb-4">Selected work</p>
      <h2 className="mb-5 text-3xl leading-tight text-white md:text-4xl lg:text-5xl">
        Some of the websites <span className="fx-textgrad">I've built</span> for local businesses.
      </h2>
      <p className="mx-auto max-w-xs text-white/50">
        Every one is live. Scroll — the windows on either side open the real site.
      </p>
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

  // Split into left / right stacks, alternating so a featured site (the first
  // two) heads each side. Both flow upward as you scroll but at different
  // rates, so the two sides visibly separate — the waterfall parallax.
  const left: GalleryShot[] = [];
  const right: GalleryShot[] = [];
  shots.forEach((s, i) => (i % 2 === 0 ? left : right).push(s));

  const noY = useTransform(scrollYProgress, [0, 1], [0, 0]);

  return (
    <div ref={ref} className="relative">
      {/* Desktop: side windows | pinned centre text | side windows. */}
      <div className="hidden grid-cols-[1fr_minmax(240px,0.9fr)_1fr] gap-6 md:grid">
        <Column shots={left} speed={70} progress={scrollYProgress} reduceMotion={reduceMotion} />
        <CentreText />
        <div className="mt-24">
          <Column shots={right} speed={150} progress={scrollYProgress} reduceMotion={reduceMotion} />
        </div>
      </div>

      {/* Mobile: text first, then a single no-parallax column. */}
      <div className="md:hidden">
        <div className="mb-10 text-center">
          <p className="eyebrow mb-3">Selected work</p>
          <h2 className="mb-3 text-3xl leading-tight text-white">
            Some of the websites <span className="fx-textgrad">I've built</span> for local businesses.
          </h2>
          <p className="mx-auto max-w-sm text-white/50">Every one is live — tap a window to open the real site.</p>
        </div>
        <div className="flex flex-col gap-6">
          {shots.map((shot) => (
            <SiteWindow key={shot.img} shot={shot} y={noY} />
          ))}
        </div>
      </div>
    </div>
  );
}
