import { useRef } from "react";
import { observer } from "mobx-react";
import { fonts } from "@/resources/fonts/font";
import { styled } from "styled-components";
import canvasHistoryStore from "@/store/canvasHistoryStore";
import { StyledTooltip } from "./Tooltip";

type Props = {
  label: string;
  index: number;
};

type CSSHistoryTextType = {
  $index: number;
};

const HistoryElement = styled.div`
  display: flex;
  align-items: center;
  padding: 2px;
  gap: 4px;
  cursor: pointer;
`;

const HistoryText = styled.span<CSSHistoryTextType>`
  font-size: ${fonts.default};
  margin-bottom: 3px;
  // TODO : 색 color.ts에서 가져오기
  color: ${({ $index }) => ($index === 0 ? "#E3F853" : "")};

  &:hover + ${StyledTooltip} {
    opacity: 1;
    transition: opacity 0.2s ease-in-out;
  }
`;

export const RedoElement = observer(({ label, index }: Props) => {
  const textRef = useRef<HTMLSpanElement>(null);
  return (
    <HistoryElement
      onClick={() => {
        canvasHistoryStore.redoListElementClick(index);
      }}
    >
      {index === 0 ? (
        <img src="/icons/studio/icon_표시_활성화.png" alt="label-active" />
      ) : (
        <img src="/icons/studio/icon_표시.png" alt="label" />
      )}
      <HistoryText ref={textRef} $index={index}>
        {label}
      </HistoryText>
    </HistoryElement>
  );
});
