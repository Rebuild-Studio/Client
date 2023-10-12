import { basicColors, bgColors } from "@/resources/colors/colors";
import { ButtonAnimationType } from "@/types/style/buttonAnimations";
import { CSSHexColor, CSSSize } from "@/types/style/cssUnits";
import { CSSShadow, ShadowType } from "@/types/style/shadow";
import { getButtonClickAnimation } from "@/utils/animation/button";
import { getShadow } from "@utils/style/getShadow";
import styled, { css } from "styled-components";

interface SCButtonProps {
  $backgroundColor: CSSHexColor;
  $hoverBackgroundColor: CSSHexColor;
  $backgroundImage: string;
  $hoverBackgroundImage: string;
  $clickAnimation: ButtonAnimationType;
  $shadow: CSSShadow;
  $outline: boolean;
  $color: CSSHexColor;
  $size: CSSSize;
  $height: CSSSize;
}

// prettier-ignore
export const SCButton = styled.button<SCButtonProps>`
  width: ${({$size}) => $size};
  height: ${({$height}) => $height};
  font-family: "Pretendard";
  font-size: 14px;
  color: ${({ $color }) => $color};
  border: none;
  border-radius: 0;
  box-shadow: ${({ $shadow }) => $shadow};
  object-fit: fill;
  background-image: url(${({ $backgroundImage }) => $backgroundImage});
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-color: transparent;

  cursor: pointer;

  &:disabled {
    color: ${basicColors.grey};
    // background-color: ${bgColors[222222]};
    // border: 1px solid ${bgColors[222222]};
    // box-shadow: "none";
  }

  &:disabled:hover {
    color: ${basicColors.grey};
    background-color: ${bgColors[101728]};
    border: 1px solid ${bgColors[101728]};
  }

  &:hover {
    background-image: url(${({ $hoverBackgroundImage }) => $hoverBackgroundImage});
    background-repeat: no-repeat;
    background-color: transparent;
    background-size: 100% 100%;
    border-radius: 0;
  }

  &:active {
    animation: ${({ $clickAnimation }) =>
      css`
        ${getButtonClickAnimation($clickAnimation)} 0.2s ease-in-out
      `};
    box-shadow: "none";
  }
`;

export interface Props {
  onClick?: () => void;
  label?: string;
  size?: CSSSize;
  height?: CSSSize;
  animation?: ButtonAnimationType;
  shadow?: ShadowType;
  color?: CSSHexColor;
  backgroundColor?: CSSHexColor;
  hoverBackgroundColor?: CSSHexColor;
  backgroundImage?: string;
  hoverBackgroundImage?: string;
  disabled?: boolean;
  outline?: boolean;
}

const Button = ({
  onClick = () => {},
  label,
  disabled = false,
  size = "fit-content",
  height = "60px",
  animation = "none",
  backgroundColor = bgColors[222222],
  hoverBackgroundColor = bgColors[222222],
  shadow = "default",
  backgroundImage = "",
  hoverBackgroundImage = "",
  color = basicColors.white,
  outline = false,
}: Props) => {
  return (
    <SCButton
      onClick={onClick}
      disabled={disabled}
      $size={size}
      $height={height}
      $clickAnimation={animation}
      $backgroundColor={backgroundColor}
      $hoverBackgroundColor={hoverBackgroundColor}
      $backgroundImage={backgroundImage}
      $hoverBackgroundImage={hoverBackgroundImage}
      $color={color}
      $shadow={disabled ? "none" : getShadow(backgroundColor, shadow)}
      $outline={outline}
    >
      {label}
    </SCButton>
  );
};

export default Button;
