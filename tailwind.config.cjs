/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            animation: {
                "fade-in": "fade-in .25s linear forwards",
            },
            colors: {
                primary: "#dd4e41",
            },
            screens: {
                xxs: "500px",
            },
        },
    },
    plugins: [],
};
