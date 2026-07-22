/** Every color resolves to `rgb(var(--x-rgb) / <alpha-value>)` so opacity
 *  modifiers (bg-ink/5, ring-accent/30, border-border/60, …) actually work —
 *  Tailwind can only alpha-blend colors stored as RGB-channel triples, not
 *  solid hex/rgb() strings. Same convention shadcn/ui uses for its own
 *  CSS-variable theme. */
function rgbVar(name) {
  return `rgb(var(--${name}-rgb) / <alpha-value>)`;
}

export default {
  darkMode: ['selector', '[data-mode="dark"]'],
  content: ['./src/**/*.{astro,tsx,ts,jsx,js,md,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: rgbVar('bg'), bg2: rgbVar('bg2'), ink: rgbVar('ink'), ink2: rgbVar('ink2'),
        card: rgbVar('card'), accent: rgbVar('accent'), 'accent-d': rgbVar('accent-d'),
        pop: rgbVar('pop'), ok: rgbVar('ok'), border: rgbVar('border'),
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
