/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
          bounce200: 'bounce 1s infinite 200ms',
          bounce400: 'bounce 1s infinite 400ms',
          linear: 'scroll 40s linear infinite',
      },
      boxShadow: {
        'full': '0 0px 10px 1px rgba(0, 0, 0, 0.3)',
      },
      dropShadow: {
        'full': '0 0px 10px rgba(0, 0, 0, 0.25)',
      }
  },
    // colors: {
    //   transparent: 'transparent',
    //   current: 'currentColor',
    //   'facebook': '#3b5998',
    //   'google': '#dd4b36',
    // },
  },
  plugins: [],
}

