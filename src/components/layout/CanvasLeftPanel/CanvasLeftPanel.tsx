import { useState } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import Button from "@components/common/Button";
import canvasHistoryStore from "@store/canvasHistoryStore";
import primitiveStore from "@store/primitiveStore";
import { bgColors, grayColors } from "@resources/colors/colors";
import { HierarchyPanel } from "./hierarchyPanel/HierarchyPanel";
import { HistoryPanel } from "./historyPanel/HistoryPanel";

type Props = {
  isOpen: boolean;
};

export const CanvasLeftPanel = observer(({ isOpen }: Props) => {
  const [visibleHistoryPanel, setVisibleHistoryPanel] = useState(false);
  const [visibleHierarchyPanel, setVisibleHierarchyPanel] = useState(false);

  return (
    <>
      <Wrapper $isOpen={isOpen}>
        {visibleHistoryPanel && (
          <HistoryPanel
            undoList={canvasHistoryStore.undoList}
            redoList={canvasHistoryStore.redoList}
          />
        )}
        {visibleHierarchyPanel && (
          <HierarchyPanel meshes={primitiveStore.meshes} />
        )}
      </Wrapper>
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
    </>
  );
});

type CSSWrapper = {
  $isOpen: boolean;
};

const Wrapper = styled.div<CSSWrapper>`
  z-index: 1;
  position: absolute;
  top: ${({ $isOpen }) => ($isOpen ? "180px" : "92px")};
`;

const MultiButtonBox = styled.div`
  z-index: 1;
  position: absolute;
  left: 0px;
  bottom: 0px;
  display: flex;
  background-color: ${bgColors[222222]};
  border-radius: 0px 10px 0px 10px;
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
