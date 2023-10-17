type CSSPercentage = `${number}%`;
type CSSPixel = `${number}px`;
type CSSRem = `${number}rem`;
type CSSvw = `${number}vw`;
type CSSvh = `${number}vh`;
type CSSPoint = `${number}pt`;
type CSSFitContent = "fit-content";

type CSSHexColor = `#${string}`;
type CSSRgb = `rgb(${number}, ${number}, ${number})`;
type CSSRgba = `rgba(${number}, ${number}, ${number}, ${number})`;

type CSSSize =
  | CSSPercentage
  | CSSPixel
  | CSSRem
  | CSSPoint
  | CSSvw
  | CSSvh
  | CSSFitContent;

type CSSColor = CSSHexColor | CSSRgb | CSSRgba;

export type { CSSSize, CSSColor };
export type {
  CSSHexColor,
  CSSPercentage,
  CSSPixel,
  CSSRem,
  CSSPoint,
  CSSFitContent,
  CSSRgb,
  CSSRgba
};
