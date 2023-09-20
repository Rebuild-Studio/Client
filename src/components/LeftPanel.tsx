import styled from "styled-components";
import { HistoryPanel } from "./layout/HistoryPanel/HistoryPanel";
import { basicColors, bgColors } from "@/resources/colors/colors";
import { fonts } from "@/resources/fonts/font";
import canvasHistoryStore from "@/store/canvasHistoryStore";
import { observer } from "mobx-react";
import { useEffect } from "react";
import primitiveStore from "@/store/primitiveStore";

// TODO : z 인덱스 논의 필요!, 높이 크기도 바 높이에 따라 달라짐
const StyledLeftPanel = styled.div`
  position: absolute;
  top: 60px;
  width: 285px;
  height: 80vh;
  background-color: ${bgColors[404040]};
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
  padding: 18px;
`;

const StyledContent = styled.div``;

export const LeftPanel = observer(() => {
  useEffect(() => {
    canvasHistoryStore.differ();
  }, [primitiveStore.meshes]);

  return (
    <StyledLeftPanel>
      <StyledHeader>히스토리</StyledHeader>
      <StyledTab>{`[캔버스] [인터렉션 에디터]`}</StyledTab>
      <StyledContent>
        <HistoryPanel
          undoList={canvasHistoryStore.undoList}
          redoList={canvasHistoryStore.redoList}
        />
      </StyledContent>
    </StyledLeftPanel>
  );
});
