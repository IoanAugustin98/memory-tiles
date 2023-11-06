/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  safelist: [
    'grid-cols-4',
    'grid-cols-6',
    'grid-cols-8',
    'grid-cols-10',
    'grid-cols-12'
  ],
  theme: {
    colors: {
      light:      '#eee',
      black:      '#000',
      white:      '#fff',
      'gray-500': '#222831',
      'gray-300': '#393e46',
      primary:     '#00adb5',
    },
    extend: {},
  },
  plugins: [],
}

