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
          light: '#0E8B9E',
        },
        secondary: {
          DEFAULT: '#0E8B9E',
          dark: '#0A6F7E',
          light: '#17B5CE',
        },
        accent: {
          DEFAULT: '#17B5CE',
          dark: '#0E8B9E',
          light: '#4DC9DD',
        },
        gold: {
          DEFAULT: '#F7A731',
          dark: '#D48E1A',
          light: '#F9BE5E',
        },
        coral: {
          DEFAULT: '#E85D4A',
          dark: '#C74433',
          light: '#EE8275',
        },
        sand: {
          DEFAULT: '#FAF9F6',
          dark: '#F0EDE7',
        },
        coconut: {
          DEFAULT: '#F5F0EB',
          dark: '#E8DFD5',
        },
        driftwood: {
          DEFAULT: '#4A5568',
          light: '#718096',
        },
        charcoal: {
          DEFAULT: '#1A1A2E',
          light: '#2D2D44',
        },
        seafoam: {
          DEFAULT: '#E6F2F7',
          dark: '#C5DFE9',
        },
      },
      fontFamily: {
        display: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        card: '12px',
        button: '8px',
        pill: '9999px',
      },
      boxShadow: {
        card: '0 2px 8px rgba(74, 85, 104, 0.08)',
        'card-hover': '0 4px 16px rgba(74, 85, 104, 0.12)',
        nav: '0 -2px 10px rgba(74, 85, 104, 0.08)',
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
