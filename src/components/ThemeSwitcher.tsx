import { useEffect, useState } from 'react';

const THEMES = [
  { id: 'ember', label: 'Ember' },
  { id: 'moss', label: 'Moss' },
  { id: 'kinetic', label: 'Kinetic' },
] as const;

/** Dev-only floating switcher: flips [data-theme] on <html> instantly (no
 *  reload) and syncs the choice to ?theme= + localStorage so a specific
 *  look is linkable/screenshottable. Meant to be removed before any future
 *  deploy — this is a local-comparison tool, not a shipped feature. */
export default function ThemeSwitcher() {
  const [active, setActive] = useState('ember');

  useEffect(() => {
    setActive(document.documentElement.dataset.theme || 'ember');
  }, []);

  function pick(id: string) {
    document.documentElement.dataset.theme = id;
    setActive(id);
    localStorage.setItem('pi-theme', id);
    const url = new URL(location.href);
    url.searchParams.set('theme', id);
    history.replaceState(null, '', url);
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex gap-1 rounded-btn border border-border bg-card p-1 shadow-lift">
      {THEMES.map((t) => (
        <button
          key={t.id}
          onClick={() => pick(t.id)}
          className={`rounded-btn px-3 py-1.5 text-xs font-medium transition-colors ${
            active === t.id ? 'bg-accent text-white' : 'text-ink2 hover:bg-ink/5'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
