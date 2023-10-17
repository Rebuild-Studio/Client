import { useRef } from "react";
import { observer } from "mobx-react";
import { styled } from "styled-components";
import canvasHistoryStore from "@store/canvasHistoryStore";
import { grayColors } from "@resources/colors/colors";
import { fonts } from "@resources/fonts/font";

type Props = {
  label: string;
  index: number;
};

export const UndoElement = observer(({ label, index }: Props) => {
  const textRef = useRef<HTMLSpanElement>(null);
  return (
    <HistoryElement
      onClick={() => {
        canvasHistoryStore.undoListElementClick(index);
      }}
    >
      <img src="/icons/studio/icon_비표시.png" alt="non-label" />
      <HistoryText ref={textRef}>{label}</HistoryText>
    </HistoryElement>
  );
});

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
`;
