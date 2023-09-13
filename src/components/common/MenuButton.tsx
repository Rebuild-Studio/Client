import { bgColors } from "@/resources/colors/colors";
import { fonts } from "@/resources/fonts/font";
import { CSSHexColor } from "@/types/style/CssUnits";
import { FontType } from "@/types/style/Font";
import styled from "styled-components";

export type MenuButtonProps = {
  onClick: () => void;
  label: string;
  color: CSSHexColor;
  backgroundColor: CSSHexColor;
  disabled: boolean;
  fontSize: FontType;
  width: string;
  height: string;
  minHeight: string;
  minWidth: string;
  borderRadius: string;
  fontFamily: string;
  fontWeight: number;
  hoverBackgroundColor: CSSHexColor;
};

type CSSProps = {
  $color?: CSSHexColor;
  $backgroundColor?: CSSHexColor;
  $fontSize: FontType;
  $width?: string;
  $height?: string;
  $minHeight?: string;
  $minWidth?: string;
  $borderRadius?: string;
  $fontFamily?: string;
  $fontWeight?: number;
  $hoverBackgroundColor?: CSSHexColor;
};

const StyledButton = styled.button<CSSProps>`
  color: ${({ $color }) => $color};
  font-size: ${({ $fontSize }) => fonts[$fontSize]};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  padding: 6px 8px;
  border: 0px;
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  min-height: ${({ $minHeight }) => $minHeight};
  min-width: ${({ $minWidth }) => $minWidth};
  border-radius: ${({ $borderRadius }) => $borderRadius};
  font-family: ${({ $fontFamily }) => $fontFamily};
  font-weight: ${({ $fontWeight }) => $fontWeight};
  margin: 0px;
  cursor: pointer;
  vertical-align: middle;
  min-width: 64px;

  &:hover {
    background-color: ${({ $hoverBackgroundColor }) => $hoverBackgroundColor};
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
`;

const MenuButton = ({
  onClick = () => {},
  label,
  color,
  backgroundColor = bgColors[101728],
  disabled = false,
  fontSize = "small",
  width,
  height,
  minHeight,
  minWidth,
  borderRadius,
  fontFamily,
  fontWeight,
  hoverBackgroundColor,
}: MenuButtonProps) => {
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      $backgroundColor={backgroundColor}
      $color={color}
      $fontSize={fontSize}
      $width={width}
      $height={height}
      $minHeight={minHeight}
      $minWidth={minWidth}
      $borderRadius={borderRadius}
      $fontFamily={fontFamily}
      $fontWeight={fontWeight}
      $hoverBackgroundColor={hoverBackgroundColor}
    >
      {label}
    </StyledButton>
  );
};

export default MenuButton;
