import { useRef } from "react";
import { grayColors } from "@/resources/colors/colors";
import { fonts } from "@/resources/fonts/font";
import { styled } from "styled-components";
import { StyledTooltip } from "./Tooltip";
import canvasHistoryStore from "@/store/canvasHistoryStore";
import { observer } from "mobx-react";

type Props = {
  label: string;
  index: number;
};

const HistoryElement = styled.div`
  display: flex;
  align-items: center;
  padding: 2px;
  gap: 4px;
  cursor: pointer;
  color: ${grayColors.panelGray};
`;

const HistoryText = styled.span`
  font-size: ${fonts.default};
  margin-bottom: 3px;

  &:hover + ${StyledTooltip} {
    opacity: 1;
    transition: opacity 0.2s ease-in-out;
  }
`;

export const UndoElement = observer(({ label, index }: Props) => {
  const textRef = useRef<HTMLSpanElement>(null);
  return (
    <HistoryElement
      onClick={() => {
        canvasHistoryStore.undoListElementClick(index);
      }}
    >
      <img src="/Icons/Studio/icon_비표시.png" alt="non-label" />
      <HistoryText ref={textRef}>{label}</HistoryText>
    </HistoryElement>
  );
});
