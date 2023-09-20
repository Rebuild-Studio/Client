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

interface translateType {
  [attr: string]: any;
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

export const HistoryPanel = observer(({ undoList, redoList }: Props) => {
  const type_translate: translateType = {
    object: "오브젝트",
    material: "머터리얼",
    camera: "카메라",
    light: "빛",
    initial: "초기상태",
  };

  const attr_translate: translateType = {
    add: "추가",
    position: "변형 (position)",
    rotation: "변형 (rotation)",
    scale: "변형 (scale)",
  };

  return (
    <HistoryList>
      {undoList.map((value, idx) => (
        <UndoElement
          label={
            (type_translate[value.type] ?? "") +
            " " +
            (attr_translate[value.attribute] ?? "")
          }
          key={idx + value.id}
          index={idx}
        />
      ))}
      {redoList.map((value, idx) => (
        <RedoElement
          label={
            (type_translate[value.type] ?? "") +
            " " +
            (attr_translate[value.attribute] ?? "")
          }
          key={idx + value.id}
          index={idx}
        />
      ))}
    </HistoryList>
  );
});
