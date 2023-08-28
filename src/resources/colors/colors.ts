import { CSSHexColor } from "@/types/style/CssUnits";
/**
 * 사용하는 색상을 명세하는 곳 입니다.
 * 새로 추가되는 색상을 여기에 추가하시고 import해서 사용하시면 됩니다.
 */
type HexColorObject = {
  [key: string]: CSSHexColor;
};

const basicColors = {
  white: "#FFFFFF",
  black: "#000000",
} as const satisfies HexColorObject;

const bgColors = {
  "222222": "#222222",
  "101728": "#101728",
} as const satisfies HexColorObject;

export { basicColors, bgColors };
