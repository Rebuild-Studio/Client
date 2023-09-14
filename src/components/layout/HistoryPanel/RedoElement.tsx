import { fonts } from "@/resources/fonts/font";
import { styled } from "styled-components";

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
`;

export const RedoElement = ({ label, index }: Props) => {
  return (
    <HistoryElement>
      {index === 0 ? (
        <img src="/Icons/Studio/icon_표시_활성화.png" />
      ) : (
        <img src="/Icons/Studio/icon_표시.png" />
      )}
      <HistoryText $index={index}>{label}</HistoryText>
    </HistoryElement>
  );
};
