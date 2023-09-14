import { fonts } from "@/resources/fonts/font";
import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { StyledTooltip, Tooltip } from "./Tooltip";

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

export const RedoElement = ({ label, index }: Props) => {
  const [tooltipPos, setTooltipPos] = useState(0);

  useEffect(() => {
    setTooltipPos(textRef.current?.clientWidth ?? 0);
  }, []);
  const textRef = useRef<HTMLSpanElement>(null);
  return (
    <HistoryElement>
      {index === 0 ? (
        <img src="/Icons/Studio/icon_표시_활성화.png" />
      ) : (
        <img src="/Icons/Studio/icon_표시.png" />
      )}
      <HistoryText ref={textRef} $index={index}>
        {label}
      </HistoryText>
      <Tooltip left={tooltipPos} label={label} />
    </HistoryElement>
  );
};
