import { useState } from "react";
import { observer } from "mobx-react";
import { HistoryPanel } from "./historyPanel/HistoryPanel";
import { HierarchyPanel } from "./hierarchyPanel/HierarchyPanel";
import styled from "styled-components";
import { bgColors, grayColors } from "@/resources/colors/colors";
import Button from "@/components/common/Button";

const Wrapper = styled.div`
  z-index: 1;
  position: absolute;
  top: 100px;
`;

const MultiButtonBox = styled.div`
  position: absolute;
  top: calc(100vh - 220px);
  display: flex;
  background-color: ${bgColors[222222]};
  border-radius: 0px 10px 0px 10px;
  display: flex;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;

  &:hover {
    background-color: ${grayColors["3a3a3a"]};
  }
`;

export const CanvasLeftPanel = observer(() => {
  const [visibleHistoryPanel, setVisibleHistoryPanel] = useState(false);
  const [visibleHierarchyPanel, setVisibleHierarchyPanel] = useState(false);

  return (
    <Wrapper>
      {visibleHistoryPanel && <HistoryPanel />}
      {visibleHierarchyPanel && <HierarchyPanel />}
      <MultiButtonBox>
        <ButtonWrapper>
          <Button
            size="32px"
            height="32px"
            shadow="none"
            backgroundImage={
              visibleHistoryPanel
                ? "/icons/studio/icon_history_활성화.svg"
                : "/icons/studio/icon_history.svg"
            }
            hoverBackgroundImage={"/icons/studio/icon_history_활성화.svg"}
            onClick={() => {
              setVisibleHierarchyPanel(false);
              setVisibleHistoryPanel((prev) => !prev);
            }}
          />
        </ButtonWrapper>
        <ButtonWrapper>
          <Button
            size="32px"
            height="32px"
            shadow="none"
            backgroundImage={
              visibleHierarchyPanel
                ? "/icons/studio/icon_hierarchy_활성화.svg"
                : "/icons/studio/icon_hierarchy.svg"
            }
            hoverBackgroundImage={"/icons/studio/icon_hierarchy_활성화.svg"}
            onClick={() => {
              setVisibleHistoryPanel(false);
              setVisibleHierarchyPanel((prev) => !prev);
            }}
          />
        </ButtonWrapper>
      </MultiButtonBox>
    </Wrapper>
  );
});
