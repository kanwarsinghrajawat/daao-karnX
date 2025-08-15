import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        tertiary: 'var(--color-tertiary)',

        // Text
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',

        // Decor
        'form-outline': 'var(--form-outlines)',
        divider: 'var(--divider)',

        // Semantics
        positive: 'var(--color-positive)',
        negative: 'var(--color-negative)',

        // Background (optional fallback)
        background: 'var(--color-background)',
        'background-green': 'var(--color-background-green)',
        'background-red': 'var(--color-background-red)',
        'background-gray': 'var(--color-background-gray)',
      },
      fontFamily: {
        sans: ['Gest', 'sans-serif'],
        mono: ['Gest Mono', 'monospace'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        bold: '700',
      },
      backgroundImage: {
        dots: 'radial-gradient(rgb(0 0 0 / 6%) 1px, transparent 2px)',
        'btn-gradient': 'linear-gradient(to right, #492AFF, #F49167)',
        'gradient-purple': 'linear-gradient(90deg, #DBDFFF, #9F8CFF)',
      },
      textColor: {
        'gradient-purple': 'transparent',
      },
      boxShadow: {
        'custom-soft': '0px 0px 24px rgba(0, 0, 0, 0.15)',
      },

      animation: {
        shimmer: 'shimmer 2s infinite',
      },
      keyframes: {
        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
