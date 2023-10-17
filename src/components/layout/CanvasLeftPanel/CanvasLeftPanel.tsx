import { useState } from "react";
import { observer } from "mobx-react";
import { HistoryPanel } from "./historyPanel/HistoryPanel";
import { HierarchyPanel } from "./hierarchyPanel/HierarchyPanel";
import styled from "styled-components";
import { bgColors } from "@/resources/colors/colors";
import Button from "@/components/common/Button";
import canvasHistoryStore from "@/store/canvasHistoryStore";
import primitiveStore from "@/store/primitiveStore";

export const CanvasLeftPanel = observer(() => {
  const [visibleHistoryPanel, setVisibleHistoryPanel] = useState(false);
  const [visibleHierarchyPanel, setVisibleHierarchyPanel] = useState(false);

  return (
    <Wrapper>
      <PanelWrapper>
        {visibleHistoryPanel && (
          <HistoryPanel
            undoList={canvasHistoryStore.undoList}
            redoList={canvasHistoryStore.redoList}
          />
        )}
        {visibleHierarchyPanel && (
          <HierarchyPanel meshes={primitiveStore.meshes} />
        )}
      </PanelWrapper>
      <MultiButtonBox>
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
      </MultiButtonBox>
    </Wrapper>
  );
});

const Wrapper = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const PanelWrapper = styled.div`
  flex: 1;
  pointer-events: auto;
`;

const MultiButtonBox = styled.div`
  display: flex;
  background-color: ${bgColors[222222]};
  border-radius: 0 10px 0 10px;
  width: fit-content;
  pointer-events: auto;
`;
