import { basicColors, grayColors } from "@/resources/colors/colors";
import { fonts } from "@/resources/fonts/font";
import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { StyledTooltip, Tooltip } from "./Tooltip";
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
  const [tooltipPos, setTooltipPos] = useState(0);

  useEffect(() => {
    setTooltipPos(textRef.current?.clientWidth ?? 0);
  }, []);
  const textRef = useRef<HTMLSpanElement>(null);
  return (
    <HistoryElement
      onClick={() => {
        canvasHistoryStore.undoListElementClick(index);
      }}
    >
      <img src="/icons/studio/icon_비표시.png" />
      <HistoryText ref={textRef}>{label}</HistoryText>
      <Tooltip left={tooltipPos} label={label} />
    </HistoryElement>
  );
});
