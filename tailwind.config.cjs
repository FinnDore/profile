/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            animation: {
                "fade-in": "fade-in .25s linear forwards",
            },
            screens: {
                xxs: "500px",
            },
        },
    },
    plugins: [],
};
