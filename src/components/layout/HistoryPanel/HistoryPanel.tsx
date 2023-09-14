import { basicColors, bgColors } from "@/resources/colors/colors";
import { styled } from "styled-components";
import { UndoElement } from "./UnDoElement";
import { RedoElement } from "./RedoElement";

type Props = {
  undoList: CanvasHistory[];
  redoList: CanvasHistory[];
};

export interface CanvasHistory {
  id: string;
  type: "object" | "material" | "light" | "camera";
  attribute: string;
}

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 11px;
  background-color: ${bgColors[404040]};
  color: ${basicColors.white};
  padding: 10px 11px;
`;

export const HistoryPanel = ({ undoList, redoList }: Props) => {
  return (
    <HistoryList>
      {undoList.map((value, idx) => (
        <UndoElement
          label={value.type + " " + value.attribute}
          key={idx + value.id}
        />
      ))}
      {redoList.map((value, idx) => (
        <RedoElement
          label={value.type + " " + value.attribute}
          key={idx + value.id}
          index={idx}
        />
      ))}
    </HistoryList>
  );
};
