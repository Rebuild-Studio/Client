import styled from "styled-components";
import { CSSHexColor } from "@/types/style/cssUnits";
import { FontType } from "@/types/style/font";
import { basicColors, bgColors } from "@resources/colors/colors";
import { fonts } from "@resources/fonts/font";

export type MenuButtonProps = {
  className?: string;
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

const MenuButton = ({
  className,
  onClick = () => {},
  label,
  disabled = false,
  color = basicColors.black,
  backgroundColor = bgColors[101728],
  hoverBackgroundColor = basicColors.limeGreen,
  fontSize = "small",
  width = "138px",
  height = "34px",
  minWidth = "80px",
  minHeight = "32px",
  borderRadius = "6px",
  fontFamily = "SourceHanSansKR",
  fontWeight = 500
}: MenuButtonProps) => {
  return (
    <StyledButton
      className={className}
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
