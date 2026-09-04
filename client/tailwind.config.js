/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#18211f',
        sage: '#879f8b',
        cream: '#f5f3ed'
      }
    }
  },
  plugins: []
}
