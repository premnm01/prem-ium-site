/** Tailwind theme resolves to CSS vars set in global.css. Three named themes
 *  (ember/moss/kinetic) override those vars via [data-theme="..."] blocks so
 *  the whole palette+font system can be flipped at runtime for comparison. */
export default {
  darkMode: ['selector', '[data-mode="dark"]'],
  content: ['./src/**/*.{astro,tsx,ts,jsx,js,md,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)', bg2: 'var(--bg2)', ink: 'var(--ink)', ink2: 'var(--ink2)',
        card: 'var(--card)', accent: 'var(--accent)', 'accent-d': 'var(--accent-d)',
        pop: 'var(--pop)', ok: 'var(--ok)', border: 'var(--border)',
      },
      fontFamily: {
        display: 'var(--font-d)',
        body: 'var(--font-b)',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        lg: 'var(--radius-lg)',
        btn: 'var(--btn-radius)',
      },
      boxShadow: {
        soft: 'var(--shadow-1)',
        lift: 'var(--shadow-2)',
      },
      letterSpacing: {
        display: 'var(--display-ls)',
        eyebrow: 'var(--eyebrow-ls)',
      },
    },
  },
  plugins: [],
};
