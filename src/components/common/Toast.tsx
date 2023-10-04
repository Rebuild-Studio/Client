import {useState, useEffect} from "react";
import {basicColors, bgColors, grayColors} from "@/resources/colors/colors";
import { fonts } from "@/resources/fonts/font";
import { CSSHexColor } from "@/types/style/CssUnits";
import { FontType } from "@/types/style/Font";
import styled, {keyframes, css} from "styled-components";

export type ToastProps = {
  label: string;
  fadeOut?: boolean;
  fadeIn?: boolean;
  fontSize?: FontType;
  color?: CSSHexColor;
  backgroundColor?: CSSHexColor;
  width?: string;
  height?: string;
  minHeight?: string;
  minWidth?: string;
  borderRadius?: string;
  border?: string;
  fontFamily?: string;
  fontWeight?: number;
  duration?: number;
};

type CSSProps = {
  $fadeIn: boolean;
  $fadeOut: boolean;
  $fontSize: FontType;
  $color?: CSSHexColor;
  $backgroundColor?: CSSHexColor;
  $width?: string;
  $height?: string;
  $minHeight?: string;
  $minWidth?: string;
  $borderRadius?: string;
  $border?: string;
  $fontFamily?: string;
  $fontWeight?: number;
};

const fadeOutAnimation = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const fadeInAnimation = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const StyledToast = styled.button<CSSProps>`
  color: ${({ $color }) => $color};
  font-size: ${({ $fontSize }) => fonts[$fontSize]};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  padding: 6px 8px;
  border: ${({ $border }) => $border};
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  min-height: ${({ $minHeight }) => $minHeight};
  min-width: ${({ $minWidth }) => $minWidth};
  border-radius: ${({ $borderRadius }) => $borderRadius};
  font-family: ${({ $fontFamily }) => $fontFamily};
  font-weight: ${({ $fontWeight }) => $fontWeight};
  margin: 0;
  cursor: pointer;
  vertical-align: middle;
  animation: ${({ $fadeOut, $fadeIn }) => {
    if ($fadeIn) {
      return css`${fadeInAnimation} 0.5s ease-in-out`;
    }
    if ($fadeOut) {
      return css`${fadeOutAnimation} 0.5s ease-in-out forwards`;
    }
    return 'none';
  }};
`;

const Toast = ({
  fadeOut = true,
  fadeIn = true,
  label,
  color = basicColors.lightLimeGreen,
  backgroundColor = bgColors[222222],
  fontSize = "small",
  width = "fit-content",
  height = "34px",
  minWidth = "80px",
  minHeight = "32px",
  borderRadius = "6px",
  border = `2px solid ${grayColors[535353]}`,
  fontFamily = "SourceHanSansKR",
  fontWeight = 500,
  duration = 3000,
                    }: ToastProps) => {

  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (fadeOut) {
        setIsFadingOut(true);
        setTimeout(() => {
          setIsVisible(false);
        }, 500);
      } else {
        setIsVisible(false);
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, fadeOut]);

  if (!isVisible) return null;

  return (
    <StyledToast
      $fadeIn={fadeIn && !isFadingOut}
      $fadeOut={isFadingOut}
      $backgroundColor={backgroundColor}
      $color={color}
      $fontSize={fontSize}
      $width={width}
      $height={height}
      $minHeight={minHeight}
      $minWidth={minWidth}
      $borderRadius={borderRadius}
      $border={border}
      $fontFamily={fontFamily}
      $fontWeight={fontWeight}
    >
      {label}
    </StyledToast>
  );
};

export default Toast;
