// Define general settings for Tailwind to handle CSS fonts and base styles
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Montserrat', 'sans-serif']
            }
        }
    },
    plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
};
