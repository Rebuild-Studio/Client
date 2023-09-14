import { basicColors, bgColors } from "@/resources/colors/colors";
import { CSSHexColor } from "@/types/style/CssUnits";
import { styled } from "styled-components";
import { UndoElement } from "./UnDoElement";
import { RedoElement } from "./RedoElement";

type Props = {
  undoList: CanvasHistory[];
  redoList: CanvasHistory[];
  selectedColor: CSSHexColor;
};

export interface CanvasHistory {
  id: string;
  type: "object" | "material" | "light" | "camera";
  attribute: string;
  isRedo: boolean;
}

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 11px;
  background-color: ${bgColors.sceneBackground};
  color: ${basicColors.white};
  padding: 10px 11px;
`;

// const CanvasHistoryTranslate = (type: string, attribute: string) => {
//   let resType;
//   switch (type) {
//     case "object":
//       resType = "오브젝트";
//       break;
//     case "material":
//       resType = "머터리얼";
//       break;
//     case "light":
//       resType = "라이트";
//       break;
//     case "camera":
//       resType = "카메라";
//       break;
//     default:
//       resType = "";
//       break;
//   }

//   let resAttribute;
//   switch (attribute) {
//     case "add":
//       resAttribute = "추가";
//       break;
//     case "position":
//       resAttribute = "추가";
//       break;
//     case "a":
//       resAttribute = "추가";
//       break;
//   }
// };

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
