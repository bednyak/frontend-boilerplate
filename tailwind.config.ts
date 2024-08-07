import type { Config } from "tailwindcss";
import { colors } from "./theme";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: colors,
      spacing: {
        "21.5": "86px", // Tailwind uses a base-4 scale by default, so 21.5 * 4 = 86. This one is for modal
      },
    },
  },
  plugins: [],
};
export default config;
