import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

// 21×21 pixel heart (1 = lit brick) — ported from the original prem-ium.inc.
const HEART = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,0],
  [0,0,0,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,0,0,0],
  [0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
  [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
  [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
  [0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
  [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

/** The original site's pixel-heart splash: bricks build from the centre, then
 *  shatter outward and the overlay fades. Plays on every home-page load
 *  and is skipped under prefers-reduced-motion. Bricks/label use the active
 *  theme's accent→pop gradient. Faithful port of the original splash.js. */
export default function Splash() {
  const [gone, setGone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on the home page (so the /portfolio directory isn't gated behind a
    // 3s intro), and skipped under reduced-motion. NOT session-gated, so it
    // replays on every home load / reload.
    if (
      window.location.pathname !== '/' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setGone(true);
      return;
    }
    const splash = rootRef.current, grid = gridRef.current, label = labelRef.current;
    if (!splash || !grid || !label) return;

    const cells: HTMLDivElement[] = [];
    const meta: any[] = [];
    HEART.forEach((row, r) =>
      row.forEach((on, c) => {
        if (!on) return;
        const div = document.createElement('div');
        div.className = 'splash-brick';
        div.style.gridColumn = String(c + 1);
        div.style.gridRow = String(r + 1);
        grid.appendChild(div);
        cells.push(div);
        meta.push({ dx: c - 10, dy: r - 8 });
      }),
    );

    // per-letter spans so the label shatters independently
    const raw = label.textContent || '';
    label.textContent = '';
    raw.split('').forEach((ch) => {
      const s = document.createElement('span');
      s.className = 'splash-letter';
      s.textContent = ch === ' ' ? ' ' : ch;
      label.appendChild(s);
    });
    const letters = label.querySelectorAll('span');

    const maxDist = Math.sqrt(200);
    meta.forEach((m) => {
      const dist = Math.sqrt(m.dx * m.dx + m.dy * m.dy);
      const angle = Math.atan2(m.dy, m.dx) + (Math.random() - 0.5) * 0.45;
      const force = 220 + dist * 22 + Math.random() * 280;
      m.tx = Math.cos(angle) * force;
      m.ty = Math.sin(angle) * force + 120 + Math.random() * 220;
      m.rot = (Math.random() - 0.5) * 540;
      m.sc = Math.random() * 0.35 + 0.08;
      m.dur = 1.1 + Math.random() * 0.7;
      m.delay = 0.01 + (dist / maxDist) * 0.055 + Math.random() * 0.025;
    });

    gsap.set(cells, { scale: 0, opacity: 0, force3D: true });
    const tl = gsap.timeline();
    tl.to(cells, {
      scale: 1, opacity: 1, duration: 0.55, force3D: true,
      stagger: { amount: 1.6, from: 'center', grid: [21, 21] },
      ease: 'back.out(1.4)',
    })
      .fromTo(label, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.55, ease: 'power2.out' }, '-=.25')
      .add(() => {
        gsap.to(cells, {
          x: (i: number) => meta[i].tx, y: (i: number) => meta[i].ty,
          rotationZ: (i: number) => meta[i].rot, scale: (i: number) => meta[i].sc,
          opacity: 0, duration: (i: number) => meta[i].dur, delay: (i: number) => meta[i].delay,
          ease: 'power2.out', force3D: true,
        });
        gsap.to(letters, {
          y: () => 80 + Math.random() * 180, x: () => (Math.random() - 0.5) * 240,
          rotationZ: () => (Math.random() - 0.5) * 110, opacity: 0,
          duration: () => 0.75 + Math.random() * 0.5,
          stagger: { each: 0.022, from: 'random' }, ease: 'power2.in', delay: 0.35,
        });
        gsap.to(splash, {
          opacity: 0, duration: 0.4, delay: 1.3,
          onComplete: () => { setGone(true); },
        });
      }, '+=1.1');

    return () => { tl.kill(); };
  }, []);

  if (gone) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-5"
      style={{ background: 'var(--bg)' }}
    >
      <div
        ref={gridRef}
        className="splash-grid relative grid"
        style={{
          gridTemplateColumns: 'repeat(21, min(14px, 3.7vw))',
          gridTemplateRows: 'repeat(21, min(14px, 3.7vw))',
          gap: 'min(3px, .8vw)',
        }}
      />
      <div
        ref={labelRef}
        className="fx-textgrad"
        style={{ fontFamily: 'var(--font-d)', fontWeight: 800, letterSpacing: '-.5px', fontSize: 'clamp(1.4rem,3vw,2rem)' }}
      >
        prem-ium.inc
      </div>
    </div>
  );
}
