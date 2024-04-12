import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'neutral-gray': '#777777',
        'dark-gray': '#222222',
        'lighter-gray': '#2f2f2f',
        'light-gray': '#D9D9D9',
        'lightest-gray': '#F0F0F0'
      },
    },
  },
  plugins: [],
};
export default config;
