import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0C6478',
          dark: '#094E5E',
        },
      },
      fontFamily: {
        display: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontWeight: {
        extrabold: '800',
        black: '900',
      },
      borderRadius: {
        card: '16px',
        button: '8px',
        pill: '9999px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 8px 30px rgba(0, 0, 0, 0.08)',
        nav: '0 -1px 3px rgba(0, 0, 0, 0.04)',
      },
      maxWidth: {
        content: '1200px',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'ease-out',
      },
    },
  },
  plugins: [],
};

export default config;
