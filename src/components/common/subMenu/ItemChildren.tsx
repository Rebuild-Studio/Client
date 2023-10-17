import { styled } from "styled-components";
import { CSSHexColor } from "@/types/style/cssUnits";
import { grayColors } from "@resources/colors/colors";

type Props = {
  label: string;
  disabled: boolean;
  hoverBackgroundColor?: CSSHexColor;
  disabledColor?: CSSHexColor;
  onMouseEnter: () => void;
};

export const ItemChildren = ({
  label,
  disabled,
  hoverBackgroundColor = grayColors[535353],
  disabledColor = grayColors[535353],
  onMouseEnter
}: Props) => {
  return (
    <StyledItem
      $hoverBackgroundColor={hoverBackgroundColor}
      $disabledColor={disabledColor}
      className={disabled ? "disabled" : ""}
      onMouseEnter={onMouseEnter}
    >
      <span>{label}</span>
      <span style={{ float: "right" }}>{">"}</span>
    </StyledItem>
  );
};

type CSSItem = {
  $hoverBackgroundColor: CSSHexColor;
  $disabledColor: CSSHexColor;
};

const StyledItem = styled.li<CSSItem>`
  padding: 2px;

  &.disabled {
    color: ${({ $disabledColor }) => $disabledColor};
  }

  &:not(.disabled):hover {
    background-color: ${({ $hoverBackgroundColor }) => $hoverBackgroundColor};
  }
`;
