import { fonts } from "@/resources/fonts/font";
import { CSSHexColor } from "@/types/style/CssUnits";
import { FontType } from "@/types/style/Font";
import styled from "styled-components";

type Props = {
  label: string;
  color: CSSHexColor;
  backgroundColor: CSSHexColor;
  disabled: boolean;
  fontSize: FontType;
  onClick: () => void;
};

const StyledButton = styled.button<Props>`
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => fonts[fontSize]};
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: 6px 8px;
  border: 0px;
  margin: 0px
  cursor: pointer;
  vertical-align: middle;
  min-width: 64px;
`;

const MenuButton = (props: Props) => {
  return <StyledButton {...props}>{props.label}</StyledButton>;
};

export default MenuButton;
