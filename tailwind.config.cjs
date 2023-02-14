/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      width: {
        '450': '450px',
        '180': '180px'
      },
      height: {
        '650': '650px',
        '260': '260px'
    }}},
  mode :  'jit' ,
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
    theme: {
    extend: {},
  },
  plugins: [],
}
