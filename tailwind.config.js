import flowbitePlugin from 'flowbite/plugin';
import lineClamp from '@tailwindcss/line-clamp';

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [flowbitePlugin, lineClamp,],
};

