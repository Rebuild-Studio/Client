import { Shadows } from "@/types/style/shadow";
import { hexToRgba } from "@utils/style/hexToRgb";

const shadows = {
  default: (hex) => `2.5px 2.5px 2.5px 0px ${hexToRgba(hex, 0.5)}`,
  elevated: (hex) => `0px 5px 0px 0px ${hexToRgba(hex, 0.5)}`,
  pressed: (hex) => `0px 0px 0px 0px ${hexToRgba(hex, 0.5)}`,
  none: () => "none",
} as const satisfies Shadows;

export { shadows };
