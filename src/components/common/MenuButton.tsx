import { bgColors } from "@/resources/colors/colors";
import { fonts } from "@/resources/fonts/font";
import { CSSHexColor } from "@/types/style/CssUnits";
import { FontType } from "@/types/style/Font";
import styled from "styled-components";

type Props = {
  onClick: () => void;
  label: string;
  color: CSSHexColor;
  backgroundColor: CSSHexColor;
  disabled: boolean;
  fontSize: FontType;
};

type CSSProps = {
  $color: CSSHexColor;
  $backgroundColor: CSSHexColor;
  $fontSize: FontType;
};

const StyledButton = styled.button<CSSProps>`
  color: ${({ $color }) => $color};
  font-size: ${({ $fontSize }) => fonts[$fontSize]};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  padding: 6px 8px;
  border: 0px;
  margin: 0px;
  cursor: pointer;
  vertical-align: middle;
  min-width: 64px;
`;

const MenuButton = ({
  onClick = () => {},
  label,
  color,
  backgroundColor = bgColors[101728],
  disabled = false,
  fontSize = "small",
}: Props) => {
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      $backgroundColor={backgroundColor}
      $color={color}
      $fontSize={fontSize}
    >
      {label}
    </StyledButton>
  );
};

export default MenuButton;
