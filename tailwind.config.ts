import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "custom-linear-gradient":
          "linear-gradient(90deg, #010D3E 0%, #22CCED 49.5%, #010D3E 100%)",
        "faq-gradient": "linear-gradient(180deg, #010D3E 0%, #00002F 96.94%)",
        "custom-bg": "url('/images/homepage/background.svg')",
        "contact-bg": "url('/images/homepage/CTAContact.svg')",
        "picture-bg": "url('/images/homepage/picturebg.svg')",
      },
      backgroundPosition: {
        "right-medium": "right center",
        "right-lg": "right center",
      },
      screens: {
        xxsm: "300px",
        xsm: "375px",
        lsm: "390px",
        slg: "880px",
        sslg: "980px",
        xslg: "1150px",
        xlg: "1250px",
        xxl: "1440px",
      },
      height: {
        "custom-height": "calc(100vh - 96px)",
      },
      animation: {
        bounce: "bounce 1s infinite",
      },
      keyframes: {
        bounce: {
          "0%, 100%": {
            transform: "translateY(-25%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {},
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
