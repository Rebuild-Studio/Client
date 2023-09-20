import { basicColors, grayColors } from "@/resources/colors/colors";
import { fonts } from "@/resources/fonts/font";
import { styled } from "styled-components";

type Props = {
  label: string;
  left: number;
};

type CSSTooltipProps = {
  $left: number;
};

export const StyledTooltip = styled.div<CSSTooltipProps>`
  opacity: 0;
  position: absolute;
  background-color: ${grayColors[808080]};
  color: ${basicColors.white};
  font-size: ${fonts.small};
  border-radius: 5px;
  padding: 3px 7px;
  left: ${({ $left }) => $left + 70}px;
`;

export const Tooltip = ({ label, left }: Props) => {
  return <StyledTooltip $left={left}>{label}</StyledTooltip>;
};
