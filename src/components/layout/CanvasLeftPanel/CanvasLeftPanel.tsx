import { useState } from "react";
import { observer } from "mobx-react";
import { HistoryPanel } from "./historyPanel/HistoryPanel";
import styled from "styled-components";
import { bgColors } from "@/resources/colors/colors";
import canvasHistoryStore from "@/store/canvasHistoryStore";
import primitiveStore from "@/store/primitiveStore";
import Icon from "@components/common/Icon.tsx";
import { HierarchyPanel } from "@/features/hierarchy/components/HierarchyPanel";

export const CanvasLeftPanel = observer(() => {
  const [visibleHistoryPanel, setVisibleHistoryPanel] = useState(false);
  const [visibleHierarchyPanel, setVisibleHierarchyPanel] = useState(false);

  const handleHistoryClick = () => {
    setVisibleHierarchyPanel(false);
    setVisibleHistoryPanel((prev) => !prev);
  };

  const handleHierarchyClick = () => {
    setVisibleHistoryPanel(false);
    setVisibleHierarchyPanel((prev) => !prev);
  };

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
        <Button onClick={handleHistoryClick}>
          <Icon
            defaultSrc="/icons/studio/icon_history.svg"
            activeSrc="/icons/studio/icon_history_active.svg"
            alt="히스토리"
            activated={visibleHistoryPanel}
          />
        </Button>
        <Button onClick={handleHierarchyClick}>
          <Icon
            defaultSrc="/icons/studio/icon_hierarchy.svg"
            activeSrc="/icons/studio/icon_hierarchy_active.svg"
            alt="계층구조"
            activated={visibleHierarchyPanel}
          />
        </Button>
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
  border-radius: 0 10px 0 10px;
  width: fit-content;
  pointer-events: auto;
`;

const Button = styled.button`
  padding: 6px;
  background-color: ${bgColors[222222]};

  &:hover {
    background-color: transparent;
  }
`;
