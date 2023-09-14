import { grayColors } from "@/resources/colors/colors";
import { fonts } from "@/resources/fonts/font";
import { styled } from "styled-components";

type Props = {
  label: string;
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
`;

export const UndoElement = ({ label }: Props) => {
  return (
    <HistoryElement>
      <img src="/Icons/Studio/icon_비표시.png" />
      <HistoryText>{label}</HistoryText>
    </HistoryElement>
  );
};
