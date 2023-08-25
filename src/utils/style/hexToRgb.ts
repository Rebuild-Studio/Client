import type { CSSHexColor, CSSRgba } from "@/types/style/cssUnits";

const hexToRgb = (hex: CSSHexColor) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const hexToRgba = (hex: CSSHexColor, alpha: number): CSSRgba => {
  const rgb = hexToRgb(hex);
  return rgb
    ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`
    : "rgba(0, 0, 0, 0)";
};

export { hexToRgb, hexToRgba };
