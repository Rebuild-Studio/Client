import { grayColors } from "@/resources/colors/colors";
import { CSSHexColor } from "@/types/style/cssUnits";
import { styled } from "styled-components";

type Props = {
  label: string;
  disabled: boolean;
  hoverBackgroundColor?: CSSHexColor;
  disabledColor?: CSSHexColor;
  onClick: () => void;
  onMouseEnter: () => void;
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

export const Item = ({
  label,
  disabled,
  hoverBackgroundColor = grayColors[535353],
  disabledColor = grayColors[535353],
  onClick,
  onMouseEnter,
}: Props) => {
  return (
    <StyledItem
      $hoverBackgroundColor={hoverBackgroundColor}
      $disabledColor={disabledColor}
      className={disabled ? "disabled" : ""}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      <span>{label}</span>
    </StyledItem>
  );
};
