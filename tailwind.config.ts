import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "title-login": "#E3026F",
        "button-login": "#E3026F",
        "gray-sidebar": "#9C9C9C",
      },
    },
  },
  plugins: [],
};
export default config;
