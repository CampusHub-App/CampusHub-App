/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      height: {
        '1024': '1024px',
      },
      colors: {
        customBlue: '#027fff',
      },
    },    
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        scrollBehavior: ['responsive'],
      },
    },
    screens: {
      'selamat': '900',

      'sm': '414px',
      // => @media (min-width: 640px) { ... }

      'tengah': '550px',

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1050px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [],
}

