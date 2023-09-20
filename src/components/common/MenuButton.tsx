import { basicColors, bgColors } from "@/resources/colors/colors";
import { fonts } from "@/resources/fonts/font";
import { CSSHexColor } from "@/types/style/CssUnits";
import { FontType } from "@/types/style/Font";
import styled from "styled-components";

export type MenuButtonProps = {
  onClick: () => void;
  label: string;
  disabled: boolean;
  fontSize?: FontType;
  color?: CSSHexColor;
  backgroundColor?: CSSHexColor;
  hoverBackgroundColor?: CSSHexColor;
  width?: string;
  height?: string;
  minHeight?: string;
  minWidth?: string;
  borderRadius?: string;
  fontFamily?: string;
  fontWeight?: number;
};

type CSSProps = {
  $fontSize: FontType;
  $color?: CSSHexColor;
  $backgroundColor?: CSSHexColor;
  $hoverBackgroundColor?: CSSHexColor;
  $width?: string;
  $height?: string;
  $minHeight?: string;
  $minWidth?: string;
  $borderRadius?: string;
  $fontFamily?: string;
  $fontWeight?: number;
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
  disabled = false,
  color = basicColors.black,
  backgroundColor = bgColors[101728],
  hoverBackgroundColor = basicColors.limeGreen,
  fontSize = "small",
  width = "138px",
  height = "32px",
  minWidth = "80px",
  minHeight = "34px",
  borderRadius = "6px",
  fontFamily = "SourceHanSansKR",
  fontWeight = 500,
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
