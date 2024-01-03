// tailwind.config.js
const { nextui, semanticColors, commonColors } = require('@nextui-org/react')
const { themes } = require('./src/Utils/THEMES')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*{tsx,jsx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    darkMode: 'class',
    plugins: [
        nextui({
            addCommonColors: true,
            themes,
        }),
    ],
}
