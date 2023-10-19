import { useState } from "react";
import { observer } from "mobx-react";
import { basicColors, bgColors } from "@/resources/colors/colors";
import { styled } from "styled-components";
import { CanvasHistoryType } from "@/store/canvasHistoryStore";
import Tab from "../../Tab";
import { UndoElement } from "./UnDoElement";
import { RedoElement } from "./RedoElement";
import { StyledHeader, StyledPanel, StyledTab } from "../CanvasLeftPanel.style";
import { instanceTranslate, attrTranslate } from "@/resources/constants/canvas";

type Props = {
  undoList: CanvasHistoryType[];
  redoList: CanvasHistoryType[];
};

export const HistoryPanel = observer(({ undoList, redoList }: Props) => {
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (index: number) => {
    //Todo: 인터렉션 에디터 붙으면 if문 지우기(이정우)
    if (index === 0) setActiveTab(index);
  };

  return (
    <StyledPanel>
      <StyledHeader>히스토리</StyledHeader>
      <StyledTab>
        <Tab
          tabs={["캔버스", "인터렉션 에디터"]}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </StyledTab>
      {activeTab === 0 && (
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
      )}
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
