/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layout/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          500: '#ff6b35',
        },
        secondary: {
          100: '#f3f4f6',
          500: '#6b7280',
        },
        screens: {
          '2xl': '1536px', // Ekran >= 1536px (2xl breakpoint)
          'max-2xl': { max: '1535px' }, // Ekran < 1536px
        },
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
