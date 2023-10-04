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
  lightLimeGreen: "#E3F853",
  limeGreen: "#d4ed3e",
  primary: "#e1f853",
} as const satisfies HexColorObject;

const bgColors = {
  "222222": "#222222",
  "101728": "#101728",
  "282828": "#282828",
  "1c1c1c": "#1c1c1c",
  "343434": "#343434",
  "404040": "#404040",
  sceneBackground: "#333333",
} as const satisfies HexColorObject;

const grayColors = {
  "535353": "#535353",
  "3a3a3a": "#3a3a3a",
  "808080": "#808080",
  E2E2E2: "#E2E2E2",
  BABABA: "#BABABA",
  buttonColor: "#303030",
  lightGray: "#e2e2e2",
  panelGray: "#aaaaaa",
  panelFontColor: "#666",
} as const satisfies HexColorObject;

const gridColor = {
  gray: 0x888888,
  black: 0x222222,
  Xaxis: 0xd14e66,
  Yaxis: 0x5a93ba,
} as const;
export { basicColors, bgColors, grayColors, gridColor };
