import { basicColors, bgColors } from "@/resources/colors/colors";
import { styled } from "styled-components";
import canvasHistoryStore, {
  CanvasAttribute,
  CanvasInstance,
} from "@/store/canvasHistoryStore";
import { observer } from "mobx-react";
import { Tabs } from "../../Tabs";
import { UndoElement } from "./UnDoElement";
import { RedoElement } from "./RedoElement";
import {
  StyledContent,
  StyledHeader,
  StyledPanel,
  StyledTab,
} from "../CanvasLeftPanel.style";

type Props = {};

type InstanceTranslate = {
  [attr in CanvasInstance]: string;
};

type AttributeTranslate = {
  [attr in CanvasAttribute]: string;
};

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 11px;
  color: ${basicColors.white};
  padding: 10px 11px;
`;

export const HistoryPanel = observer((props: Props) => {
  const undoList = canvasHistoryStore.undoList;
  const redoList = canvasHistoryStore.redoList;

  const instance_translate: InstanceTranslate = {
    CUBE: "정육면체",
    CAPSULE: "캡슐",
    CONE: "원뿔",
    CYLINDER: "원기둥",
    SPHERE: "구",
    TORUS: "도넛",
    material: "머터리얼",
    GROUP: "그룹",
    camera: "카메라",
    light: "빛",
    initial: "초기상태",
  };

  const attr_translate: AttributeTranslate = {
    add: "추가",
    position: "변형 (position)",
    rotation: "변형 (rotation)",
    scale: "변형 (scale)",
    none: "",
  };

  return (
    <StyledPanel>
      <StyledHeader>히스토리</StyledHeader>
      <StyledTab>
        <Tabs
          labelList={["캔버스", "인터렉션 에디터"]}
          width="100%"
          height="30px"
          backgroundColor={bgColors[222222]}
          selectedColor={basicColors.white}
          underbarColor={basicColors.white}
        />
      </StyledTab>
      <StyledContent>
        <HistoryList>
          {undoList.map((value, idx) => (
            <UndoElement
              label={
                (instance_translate[value.instance] ?? value.instance) +
                " " +
                (attr_translate[value.attribute] ?? value.attribute)
              }
              key={idx + value.id}
              index={idx}
            />
          ))}
          {redoList.map((value, idx) => (
            <RedoElement
              label={
                (instance_translate[value.instance] ?? value.instance) +
                " " +
                (attr_translate[value.attribute] ?? value.attribute)
              }
              key={idx + value.id}
              index={idx}
            />
          ))}
        </HistoryList>
      </StyledContent>
    </StyledPanel>
  );
});
