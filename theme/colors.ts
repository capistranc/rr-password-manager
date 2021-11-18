import { useColorModeValue } from "@chakra-ui/react";

export function toHex(colorStr: string) {
  if (colorStr === "white") return "#FFFFFF";
  if (colorStr === "black") return "#000000";
  if (colorStr.startsWith("#")) return colorStr;
  if (colorStr.startsWith("rgb")) return colorStr;
  const match = colorStr.match(/([a-z]+)\.([0-9]+)/);
  if (match && match.length > 2) {
    const [cString, color, weight] = match;
    return colors[color][weight];
  }
  return colorStr;
}

export const colors: any = {
  pink: {
    50: "#fef0e7",
    100: "#ecd4c5",
    200: "#deb8a1",
    300: "#d09b7b",
    400: "#c47e56",
    500: "#aa643c",
    600: "#854e2f",
    700: "#5f3821",
    800: "#3a2113",
    900: "#170a00",
  },
  blue: {
    50: "#ebefff",
    100: "#c8cfec",
    200: "#a5b0da",
    300: "#8290ca",
    400: "#5d70ba",
    500: "#4557a1",
    600: "#35437d",
    700: "#25305a",
    800: "#151d38",
    900: "#040a18",
  },
  gray: {
    50: "#f8f0f2",
    100: "#d9d9d9",
    200: "#bfbfbf",
    300: "#a6a6a6",
    400: "#8c8c8c",
    500: "#737373",
    600: "#595959",
    700: "#404040",
    800: "#262626",
    900: "#120b0d",
  },
  teal: {
    50: "#e1f7fe",
    100: "#c6dfea",
    200: "#a7c8d6",
    300: "#86b1c5",
    400: "#669bb3",
    500: "#4d8199",
    600: "#3a6478",
    700: "#274857",
    800: "#122c36",
    900: "#001019",
  },
};

const colorSchemes = {
  bg: {
    light: toHex("white"),
    dark: toHex("blue.900"),
  },
  bg2: {
    light:
      "linear-gradient(0deg, rgba(222,182,152,0.5) 0%, rgba(255,255,255,1) 50%, rgba(222,182,152,0.5) 100%);",
    dark: toHex("blue.800"),
  },
  bg3: {
    light:
      "linear-gradient(-45deg, rgba(222,182,152,0.5) 0%, rgba(255,255,255,1) 100%)",
    dark: "linear-gradient(45deg, rgba(222,182,152,0.5) 0%, rgba(255,255,255,1) 100%",
  },
  fg: { light: toHex("gray.700"), dark: toHex("gray.100") },
  fg2: {
    light: toHex("white"),
    dark: toHex("gray.100"),
  },

  h1: {
    light: toHex("blue.700"),
    dark: toHex("blue.700"),
  },
  h2: {
    light: toHex("pink.200"),
    dark: toHex("pink.200"),
  },
  icon1: {
    light: toHex("blue.600"),
    dark: toHex("blue.600"),
  },
  icon2: {
    light: toHex("blue.600"),
    dark: toHex("blue.600"),
  },
  icon3: {
    light: toHex("pink.200"),
    dark: toHex("pink.200"),
  },
  overlayIcon: {
    light: toHex("pink.200"),
    dark: toHex("pink.200"),
  },
  border1: {
    light: toHex("pink.200"),
    dark: toHex("pink.200"),
  },
  bw: {
    light: toHex("black"),
    dark: toHex("white"),
  },
  wb: {
    light: toHex("white"),
    dark: toHex("black"),
  },
};

export const theme = {
  ...colorSchemes,
  toHex,
  ...colors,
};
