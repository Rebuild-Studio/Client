import { observer } from "mobx-react";
import { HistoryPanel } from "./layout/HistoryPanel/HistoryPanel";
import { basicColors, bgColors } from "@/resources/colors/colors";
import { fonts } from "@/resources/fonts/font";
import { Tabs } from "./layout/Tabs";
import styled from "styled-components";
import canvasHistoryStore from "@/store/canvasHistoryStore";

const StyledLeftPanel = styled.div`
  z-index: 1;
  position: absolute;
  top: 100px;
  width: 285px;
  height: 80vh;
  background-color: ${bgColors[222222]};
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const StyledHeader = styled.div`
  color: ${basicColors.white};
  padding: 18px;
  font-size: ${fonts.medium};
`;

const StyledTab = styled.div`
  color: ${basicColors.white};
  padding-right: 30px;
  padding-bottom: 20px;
`;

const StyledContent = styled.div``;

export const LeftPanel = observer(() => {
  return (
    <StyledLeftPanel>
      <StyledHeader>히스토리</StyledHeader>
      <StyledTab>
        <Tabs
          labelList={["캔버스", "인터렉션 에디터"]}
          width="100%"
          height="30px"
          backgroundColor={bgColors["1c1c1c"]}
          selectedColor={basicColors.white}
          underbarColor={basicColors.white}
        />
      </StyledTab>
      <StyledContent>
        <HistoryPanel
          undoList={canvasHistoryStore.undoList}
          redoList={canvasHistoryStore.redoList}
        />
      </StyledContent>
    </StyledLeftPanel>
  );
});
