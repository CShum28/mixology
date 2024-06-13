import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      width: {
        "375px": "375px",
        "173px": "173px",
      },
      colors: {
        "#000": "#000",
        "#FFF": "#FFF",
        gray: "#D9D9D9",
        "#E4E4E4": "#E4E4E4",
      },
      fontSize: {
        "24px": "24px",
      },
    },
  },
  plugins: [],
};
export default config;
