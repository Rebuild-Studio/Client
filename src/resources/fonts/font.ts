import { Fonts } from "@/types/style/font";

const fonts = {
  xs: "10px",
  small: "12px",
  medium: "14px",
  large: "16px",
  xl: "20px",
  titleSize: "24px",
  default: "14px"
} as const satisfies Fonts;

export { fonts };
