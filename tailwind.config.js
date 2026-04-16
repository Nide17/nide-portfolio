/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'linear-to-t': 'linear-gradient(to top, var(--tw-gradient-stops))',
                'linear-to-tr': 'linear-gradient(to top right, var(--tw-gradient-stops))',
                'linear-to-r': 'linear-gradient(to right, var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [],
}
