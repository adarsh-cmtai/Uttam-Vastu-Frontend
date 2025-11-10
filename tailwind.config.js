// tailwind.config.js
module.exports = {
  // ...baaki configuration
  theme: {
    extend: {
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
      },
      textShadow: {
        'md': '0 2px 4px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [
     require('tailwindcss-textshadow'), // Ise install karna padega: npm install -D tailwindcss-textshadow
  ],
};