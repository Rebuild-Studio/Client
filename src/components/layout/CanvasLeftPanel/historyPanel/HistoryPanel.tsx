import { observer } from "mobx-react";
import { styled } from "styled-components";
import { CanvasHistoryType } from "@store/canvasHistoryStore";
import { basicColors, bgColors } from "@resources/colors/colors";
import { attrTranslate, instanceTranslate } from "@resources/constants/canvas";
import { RedoElement } from "./RedoElement";
import { UndoElement } from "./UnDoElement";
import { Tabs } from "../../Tabs";
import { StyledHeader, StyledPanel, StyledTab } from "../CanvasLeftPanel.style";

type Props = {
  undoList: CanvasHistoryType[];
  redoList: CanvasHistoryType[];
};

export const HistoryPanel = observer(({ undoList, redoList }: Props) => {
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
      <HistoryList>
        {undoList.map((value, idx) => (
          <UndoElement
            label={
              (instanceTranslate[value.instance] ?? value.instance) +
              " " +
              (attrTranslate[value.attribute] ?? value.attribute)
            }
            key={idx + value.id}
            index={idx}
          />
        ))}
        {redoList.map((value, idx) => (
          <RedoElement
            label={
              (instanceTranslate[value.instance] ?? value.instance) +
              " " +
              (attrTranslate[value.attribute] ?? value.attribute)
            }
            key={idx + value.id}
            index={idx}
          />
        ))}
      </HistoryList>
    </StyledPanel>
  );
});

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 11px;
  color: ${basicColors.white};
  padding: 10px 11px;
`;
