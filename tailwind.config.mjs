/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: '#FFCC00', // The primary action color from the video
          yellowHover: '#E6B800',
          dark: '#16202A',   // Deep navy/slate background
          panel: '#1E2A38',  // Slightly lighter navy for cards
          light: '#F8F9FA',  // Off-white for light sections
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      clipPath: {
        parallelogram: 'polygon(10% 0, 100% 0, 90% 100%, 0% 100%)',
      }
    },
  },
  plugins: [],
};