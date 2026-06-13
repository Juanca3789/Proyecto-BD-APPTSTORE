/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    'text-ink',
    'text-ink-muted',
    'text-ink-faint',
    'text-ink/15',
    'text-ink/20',
    'bg-ink',
    'bg-alien',
    'bg-alien-dim',
    'bg-chassis',
    'border-ink',
    'border-alien',
    'text-alien-glow',
    'placeholder:text-ink-faint',
    'focus:border-alien',
    'focus:shadow-glow',
  ],
  theme: {
    extend: {
      colors: {
        chassis: '#fafafa',
        ink: '#0a0a0a',
        'ink-muted': '#3d3d3d',
        'ink-faint': '#737373',
        alien: '#00c8ff',
        'alien-dim': '#e8f9ff',
        'alien-glow': '#22d3ee',
        line: '#e5e5e5',
        'line-dark': '#141414',
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        container: '1280px',
      },
      spacing: {
        gutter: '24px',
      },
      boxShadow: {
        card: '0 1px 0 #141414, 0 4px 24px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 0 0 1px #00c8ff, 0 8px 32px rgba(0, 200, 255, 0.12)',
        glow: '0 0 12px rgba(0, 200, 255, 0.45)',
        nav: '0 1px 0 #141414',
      },
      borderRadius: {
        sm: '2px',
        DEFAULT: '4px',
        md: '6px',
      },
    },
  },
  plugins: [],
};
