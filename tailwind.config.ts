import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#0D1117',
        'surface-variant': '#161B22',
        card: '#1C2333',
        border: '#30363D',
        'text-primary': '#E6EDF3',
        'text-secondary': '#8B949E',
        'accent-blue': '#58A6FF',
        'accent-green': '#3FB950',
        'accent-orange': '#D29922',
        'accent-red': '#F85149',
        'accent-purple': '#BC8CFF',
        'accent-cyan': '#39D2C0',
        'accent-pink': '#F778BA',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
