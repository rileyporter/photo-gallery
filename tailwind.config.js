/** @type {import('tailwindcss').Config} */
export default {
  // which files contain class names in use
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--site-bg)',
        ink: 'var(--site-ink)',
        muted: 'var(--site-muted)',
        secondary: 'var(--site-secondary)',
        line: 'var(--site-line)',
        accent: 'var(--site-accent)',
      },
      fontFamily: {
        // default font-display for project
        display: ['Fredoka', 'sans-serif'],
        // used for neutral UI, e.g. chrome labels
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
