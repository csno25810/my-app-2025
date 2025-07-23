// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        'rotate-once': 'rotateOnce 1s ease-in-out 1',
      },
      keyframes: {
        rotateOnce: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      colors: {
        faviconBlue: '#5AC8FA', // ← カスタム色名を自由に
      },
    },
  },
  plugins: [],
  darkMode: 'class',  // ← これを追加！
}
