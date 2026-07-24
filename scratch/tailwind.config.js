/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        github: {
          dark: {
            bg: '#0d1117',
            canvas: '#0d1117',
            sidebar: '#161b22',
            card: '#161b22',
            border: '#30363d',
            borderMuted: '#21262d',
            text: '#e6edf3',
            textMuted: '#8d96a0',
            accent: '#58a6ff',
            success: '#3fb950',
            danger: '#f85149',
            warning: '#d29922',
            purple: '#bc8cff',
            attention: '#d29922'
          },
          light: {
            bg: '#ffffff',
            canvas: '#f6f8fa',
            sidebar: '#f6f8fa',
            card: '#ffffff',
            border: '#d0d7de',
            borderMuted: '#afb8c1',
            text: '#24292f',
            textMuted: '#57606a',
            accent: '#0969da',
            success: '#1a7f37',
            danger: '#cf222e',
            warning: '#9a6700',
            purple: '#8250df',
            attention: '#9a6700'
          }
        },
        brand: {
          bgPrimary: '#0D1117',
          bgSecondary: '#161B22',
          bgCard: '#21262D',
          border: '#30363D',
          green: '#238636',
          purpleGlow: '#7C3AED',
          blueGlow: '#58A6FF',
          pinkGlow: '#EC4899',
          orangeGlow: '#F59E0B'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Fira Code', 'monospace']
      },
      boxShadow: {
        premium: '0 4px 30px rgba(0, 0, 0, 0.1)',
        'premium-hover': '0 10px 40px rgba(0, 0, 0, 0.15)',
        glow: '0 0 15px rgba(88, 166, 255, 0.3)'
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out forwards',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-down': 'slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
}
