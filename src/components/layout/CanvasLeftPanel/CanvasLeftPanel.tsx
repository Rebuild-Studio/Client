import { useState } from "react";
import { observer } from "mobx-react";
import { HistoryPanel } from "./historyPanel/HistoryPanel";
import { HierarchyPanel } from "./hierarchyPanel/HierarchyPanel";
import IconButton from "@/components/buttons/IconButton";
import styled from "styled-components";

const Wrapper = styled.div`
  z-index: 1;
  position: absolute;
  top: 100px;
`;

const MultiButtonBox = styled.div`
  position: absolute;
  top: calc(100vh - 250px);
  display: flex;
  width: fit-content;
  background-color: black;
`;

export const CanvasLeftPanel = observer(() => {
  const [visibleHistoryPanel, setVisibleHistoryPanel] = useState(false);
  const [visibleHierarchyPanel, setVisibleHierarchyPanel] = useState(false);

  return (
    <Wrapper>
      {visibleHistoryPanel && <HistoryPanel />}
      {visibleHierarchyPanel && <HierarchyPanel />}
      <MultiButtonBox>
        <IconButton
          Icon={() =>
            visibleHistoryPanel ? (
              <img src={"/icons/studio/icon_history_활성화.svg"} />
            ) : (
              <img src={"/icons/studio/icon_history.svg"} />
            )
          }
          onClick={() => {
            setVisibleHierarchyPanel(false);
            setVisibleHistoryPanel((prev) => !prev);
          }}
        />
        <IconButton
          Icon={() =>
            visibleHierarchyPanel ? (
              <img src={"/icons/studio/icon_hierarchy_활성화.svg"} />
            ) : (
              <img src={"/icons/studio/icon_hierarchy.svg"} />
            )
          }
          onClick={() => {
            setVisibleHistoryPanel(false);
            setVisibleHierarchyPanel((prev) => !prev);
          }}
        />
      </MultiButtonBox>
    </Wrapper>
  );
});
