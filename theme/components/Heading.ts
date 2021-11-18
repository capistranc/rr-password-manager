import { theme } from "..";
export const Heading = {
  // 1. We can update the base styles
  baseStyle: {
    // fontWeight: "bold", // Normally, it is "semibold"
  },
  // 2. We can add a new button size or extend existing
  sizes: {
    // xl: {
    //   h: "56px",
    //   fontSize: "lg",
    //   px: "32px",
    // },
  },
  // 3. We can add a new visual variant
  variants: {
    h1: (props) => ({
      fontFamily: "Open Sans",
      fontSize: ["32px", "48px", "56px", "64px"],
      fontWeight: "600",
      color: theme.h1[props.colorMode],
    }),
    h2: (props) => ({
      fontFamily: "Tangerine",
      fontSize: ["72px", "96px", "128px", "144px"],
      fontWeight: "500",
      color: theme.h2[props.colorMode],
      mb: -8,
    }),
    banner: {
      fontSize: "96px",
      color: "white",
      fontFamily: "Open Sans",
    },
    // 4. We can override existing variants
    // solid: (props) => ({
    //   bg: props.colorMode === "dark" ? "red.300" : "red.500",
    // }),
  },
};
