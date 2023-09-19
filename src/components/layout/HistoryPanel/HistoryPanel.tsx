import { basicColors, bgColors } from "@/resources/colors/colors";
import { styled } from "styled-components";
import { UndoElement } from "./UnDoElement";
import { RedoElement } from "./RedoElement";
import { CanvasType } from "@/store/canvasHistoryStore";
import { observer } from "mobx-react";

type Props = {
  undoList: CanvasType[];
  redoList: CanvasType[];
};

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 11px;
  background-color: ${bgColors[404040]};
  color: ${basicColors.white};
  padding: 10px 11px;
`;

export const HistoryPanel = observer(({ undoList, redoList }: Props) => {
  return (
    <HistoryList>
      {undoList.map((value, idx) => (
        <UndoElement
          label={value.type + " " + value.attribute}
          key={idx + value.id}
          index={idx}
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
});
