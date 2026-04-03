/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aurum: {
          bg:        '#080c10',
          surface:   '#0f151c',
          surface2:  '#151d26',
          surface3:  '#1a2535',
          border:    '#1e2d3d',
          text:      '#e8ecef',
          'text-sec':'#7a8a9a',
          'text-ter':'#4a5a6a',
          critical:  '#e84545',
          high:      '#f59e0b',
          medium:    '#3b82f6',
          low:       '#10b981',
          stable:    '#10b981',
          apex:      '#8b5cf6',
          nexus:     '#06b6d4',
          oracle:    '#185FA5',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow':  'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'ecg':        'ecg 2s linear infinite',
        'slide-up':   'slideUp 0.3s ease-out',
        'fade-in':    'fadeIn 0.4s ease-out',
        'glow-red':   'glowRed 2s ease-in-out infinite',
      },
      keyframes: {
        ecg: {
          '0%':   { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        slideUp: {
          '0%':   { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: 0 },
          '100%': { opacity: 1 },
        },
        glowRed: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(232,69,69,0.4)' },
          '50%':       { boxShadow: '0 0 20px rgba(232,69,69,0.8)' },
        },
      },
      boxShadow: {
        'glow-red':    '0 0 16px rgba(232,69,69,0.35)',
        'glow-green':  '0 0 16px rgba(16,185,129,0.35)',
        'glow-amber':  '0 0 16px rgba(245,158,11,0.35)',
        'glow-purple': '0 0 16px rgba(139,92,246,0.35)',
        'glow-cyan':   '0 0 16px rgba(6,182,212,0.35)',
        'card':        '0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)',
        'card-hover':  '0 4px 16px rgba(0,0,0,0.5)',
      }
    },
  },
  plugins: [],
}
