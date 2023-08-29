/**
 * 사용하는 색상을 명세하는 곳 입니다.
 * 새로 추가되는 색상을 여기에 추가하시고 import해서 사용하시면 됩니다.
 */

import { CSSHexColor } from "@/types/style/CssUnits";

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
  "282828": "#282828",
  "1c1c1c": "#1c1c1c",
} as const satisfies HexColorObject;

const grayColors = {
  "535353": "#535353",
} as const satisfies HexColorObject;

export { basicColors, bgColors, grayColors };
