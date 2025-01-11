import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';
import daisyui from 'daisyui';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      padding: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      keyframes: {
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        contentShow: {
          from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
          to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        },
      },
      animation: {
        overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontSize: '2.25rem', // 36px
              fontWeight: '700',
            },
            h2: {
              fontSize: '1.875rem',
              fontWeight: '600',
            },
            p: {
              fontSize: '1rem',
              lineHeight: '1.75',
            },
          },
        },
      },
    },
  },
  plugins: [typography, daisyui],
  daisyui: {
    themes: [
      {
        mydark: {
          primary: '#559CD5',
          secondary: '#d926a9',
          // "accent": "#BA9726",
          accent: '#2BC689',
          neutral: '#7B9182',
          'base-100': '#313131',
          'base-200': '#3B3F43',
          'base-300': '#2B2D30', // 一级菜单背景
          info: '#3abff8',
          success: '#36d399',
          warning: '#fbbd23',
          error: '#f87272',
        },
        donote: {
          'color-scheme': 'dark',
          primary: '#559CD5',
          secondary: '#6f6f6f', // 二级菜单active
          accent: '#ba9726', // 主题色
          neutral: '#2E3034', // 二级菜单
          'neutral-content': '#aaaaaa',
          'base-100': '#2c2c2c', // 最黑的
          'base-200': '#1E2022', // 编辑器背景
          'base-300': '#2B2D30', // 一级菜单背景
          'base-content': '#BCBEC4',
          info: '#3abff8',
          success: '#00A96D',
          warning: '#fbbd23',
          error: '#e05f54',
        },
      },
    ], // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: 'donote', // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },
};
export default config;
