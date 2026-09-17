/** @type {import('tailwindcss').Config} */
export default {
  // which files contain class names in use
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#14130F', // page background — warm charcoal, not pure black
        ink: '#F3EFE6', // primary text — warm ivory, not pure white
        muted: '#948C7B', // secondary text (captions, small UI labels)
        secondary: '#6E8B7A', // sage — used sparingly (scroll/selection highlights)
        line: '#2A2822', // hairline dividers
        accent: 'var(--site-accent)', // declared in CSS for programatic use in custom cursor
      },
      fontFamily: {
        // default font-display for project
        display: ['"Fraunces"', 'serif'],
        // used for neutral UI, e.g. chrome labels
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
