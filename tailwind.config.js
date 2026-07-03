/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        void:    '#050507',
        obsidian:'#0A0A0F',
        graphite:'#111118',
        smoke:   '#1C1C28',
        steel:   '#2A2A3C',
        mist:    '#9898B0',
        ghost:   '#C8C8D8',
        ivory:   '#F0EEE8',
        gold:    '#C9A84C',
        'gold-light': '#E8C96A',
        'gold-dark':  '#8B6914',
        platinum:'#E8E8F0',
        crimson: '#8B1A2E',
        azure:   '#1A3A8B',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        sans:    ['"DM Sans"', 'sans-serif'],
        mono:    ['"DM Mono"', 'monospace'],
        italic:  ['"Cormorant Garamond"', 'serif'],
      },
      animation: {
        'grain':        'grain 0.5s steps(1) infinite',
        'float-gentle': 'floatGentle 8s ease-in-out infinite',
        'shimmer':      'shimmer 3s ease-in-out infinite',
        'line-draw':    'lineDraw 2s ease forwards',
        'fade-up':      'fadeUp 0.8s ease forwards',
        'slow-spin':    'spin 30s linear infinite',
      },
      keyframes: {
        grain: {
          '0%,100%': { transform: 'translate(0,0)' },
          '10%':     { transform: 'translate(-2%,-3%)' },
          '20%':     { transform: 'translate(3%,2%)' },
          '30%':     { transform: 'translate(-1%,4%)' },
          '40%':     { transform: 'translate(4%,-1%)' },
          '50%':     { transform: 'translate(-3%,3%)' },
          '60%':     { transform: 'translate(2%,-4%)' },
          '70%':     { transform: 'translate(-4%,1%)' },
          '80%':     { transform: 'translate(1%,-2%)' },
          '90%':     { transform: 'translate(-2%,4%)' },
        },
        floatGentle: {
          '0%,100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':     { transform: 'translateY(-12px) rotate(0.5deg)' },
          '66%':     { transform: 'translateY(-6px) rotate(-0.3deg)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        lineDraw: {
          from: { strokeDashoffset: '1000' },
          to:   { strokeDashoffset: '0' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
