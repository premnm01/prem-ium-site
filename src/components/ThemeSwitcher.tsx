import { useEffect, useState } from 'react';

// Each theme shows as a compact swatch (accent → pop gradient) so all six fit
// in a small bar that never overflows / gets cut off. Colors mirror the
// [data-theme] blocks in global.css.
const THEMES = [
  { id: 'ember', label: 'Ember', a: '#b23c2e', b: '#e08a3c' },
  { id: 'moss', label: 'Moss', a: '#3f6b4a', b: '#d4a94a' },
  { id: 'kinetic', label: 'Kinetic', a: '#e0523f', b: '#f2b134' },
  { id: 'sand', label: 'Sand', a: '#c15f34', b: '#e0a24e' },
  { id: 'noir', label: 'Noir', a: '#e5484d', b: '#f2c14e' },
  { id: 'rose', label: 'Rose', a: '#b23a5b', b: '#e08aa0' },
  { id: 'classic', label: 'Classic', a: '#8b5cf6', b: '#ec4899' },
] as const;

/** Floating theme switcher: flips [data-theme] on <html> instantly (no reload)
 *  and syncs the choice to ?theme= + localStorage so a specific look is
 *  linkable/screenshottable. Rendered as color swatches to stay compact. */
export default function ThemeSwitcher() {
  const [active, setActive] = useState('moss');

  useEffect(() => {
    setActive(document.documentElement.dataset.theme || 'moss');
  }, []);

  function pick(id: string) {
    document.documentElement.dataset.theme = id;
    setActive(id);
    localStorage.setItem('pi-theme', id);
    const url = new URL(location.href);
    url.searchParams.set('theme', id);
    history.replaceState(null, '', url);
  }

  const activeLabel = THEMES.find((t) => t.id === active)?.label ?? '';

  return (
    <div className="fixed bottom-4 right-4 z-50 flex max-w-[calc(100vw-2rem)] items-center gap-2 rounded-full border border-white/15 bg-black/70 px-3 py-2 shadow-lift backdrop-blur">
      <span className="hidden w-14 shrink-0 text-[11px] font-medium text-white/70 sm:block">{activeLabel}</span>
      <div className="flex items-center gap-1.5">
        {THEMES.map((t) => (
          <button
            key={t.id}
            onClick={() => pick(t.id)}
            title={t.label}
            aria-label={t.label}
            aria-pressed={active === t.id}
            className={`h-6 w-6 shrink-0 rounded-full transition-transform hover:scale-110 ${
              active === t.id ? 'ring-2 ring-white ring-offset-2 ring-offset-black' : 'ring-1 ring-white/20'
            }`}
            style={{ background: `linear-gradient(135deg, ${t.a}, ${t.b})` }}
          />
        ))}
      </div>
    </div>
  );
}
