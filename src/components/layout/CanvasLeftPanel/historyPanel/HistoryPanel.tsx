import { observer } from "mobx-react";
import { basicColors, bgColors } from "@/resources/colors/colors";
import { styled } from "styled-components";
import {
  CanvasAttribute,
  CanvasHistoryType,
  CanvasInstance,
} from "@/store/canvasHistoryStore";
import { Tabs } from "../../Tabs";
import { UndoElement } from "./UnDoElement";
import { RedoElement } from "./RedoElement";
import {
  StyledContent,
  StyledHeader,
  StyledPanel,
  StyledTab,
} from "../CanvasLeftPanel.style";

type Props = {
  undoList: CanvasHistoryType[];
  redoList: CanvasHistoryType[];
};

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

export const HistoryPanel = observer(({ undoList, redoList }: Props) => {
  const instance_translate: InstanceTranslate = {
    OBJECT: "오브젝트",
    CUBE: "정육면체",
    CAPSULE: "캡슐",
    CONE: "원뿔",
    CYLINDER: "원기둥",
    SPHERE: "구",
    TORUS: "도넛",
    MATERIAL: "머터리얼",
    GROUP: "그룹",
    SELECTED_GROUP: "선택 그룹",
    CAMERA: "카메라",
    POINTLIGHT: "포인트 라이트",
    SPOTLIGHT: "스포트 라이트",
    INITIAL: "초기상태",
  };

  const attr_translate: AttributeTranslate = {
    add: "추가",
    position: "변형 (position)",
    rotation: "변형 (rotation)",
    scale: "변형 (scale)",
    delete: "삭제",
    ungroup: "해제",
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
