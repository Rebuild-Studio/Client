import { ComponentProps, ComponentType, useEffect, useState } from "react";
import { Props as ButtonProps, SCButton } from "../common/Button";
import { basicColors, bgColors } from "@/resources/colors/colors";
import { styled } from "styled-components";
import { getShadow } from "@/utils/style/getShadow";

const SCIconButton = styled(SCButton)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > * {
    margin: 0 5px;
  }

  &:hover {
  }
`;

interface Props extends ButtonProps {
  Icon: ComponentType<ComponentProps<"svg">>;
  iconGravity?: "left" | "right";
  role?: string;
}

const IconButton = ({
  onClick = () => {},
  label = "",
  disabled = false,
  size = "fit-content",
  height = "60px",
  animation = "none",
  backgroundColor = basicColors.white,
  hoverBackgroundColor = basicColors.white,
  backgroundImage = "",
  hoverBackgroundImage = "",
  shadow = "none",
  color = basicColors.white,
  outline = false,
  Icon,
  iconGravity = "right",
  role = "icon-button",
}: Props) => {
  const [iconPosition, setIconPosition] = useState<{
    left: React.ReactElement | string;
    right: React.ReactElement | string;
  }>({
    left: label,
    right: <Icon />,
  });

  useEffect(() => {
    setIconPosition(
      iconGravity === "left"
        ? { left: <Icon />, right: label }
        : { left: label, right: <Icon /> }
    );
  }, [iconGravity, label, Icon]);

  return (
    <SCIconButton
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
      role={role}
    >
      {iconPosition.left}
      {iconPosition.right}
    </SCIconButton>
  );
};

export default IconButton;
