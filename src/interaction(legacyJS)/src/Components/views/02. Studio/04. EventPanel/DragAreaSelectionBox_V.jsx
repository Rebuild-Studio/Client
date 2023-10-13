import { observer } from "mobx-react-lite";
import { useState } from "react";
import { createPortal } from "react-dom";
import styled from "@emotion/styled";
import { dragAreaSelectionBoxViewModel } from "../../../view_models/DragAreaSelectionBox_VM";
import useShiftKeyListener from "../../../hooks/useShiftKeyListener";
import storeContainer from "../../../stores/storeContainer";

const DragAreaSelectionBox = observer(() => {
  const { common_store } = storeContainer;
  const [isDrawing, setIsDrawing] = useState(false);
  const [anchor, setAnchor] = useState({ x: 0, y: 0 });
  const [box, setBox] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const portalElement = document.getElementById("drag-portal");
  const isShiftPressed = useShiftKeyListener();

  const handleMouseDown = (e) => {
    if (!isShiftPressed) return;
    setAnchor({ x: e.clientX, y: e.clientY });
    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    if (!isShiftPressed || !isDrawing) return;

    const currentX = e.clientX;
    const currentY = e.clientY;
    const x = currentX < anchor.x ? currentX : anchor.x;
    const y = currentY < anchor.y ? currentY : anchor.y;
    const width = Math.abs(currentX - anchor.x);
    const height = Math.abs(currentY - anchor.y);

    setBox({ x, y, width, height });
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    dragAreaSelectionBoxViewModel.selectMultipleNodesAndGroupsFromSelectionBox(box);
    setBox({ x: 0, y: 0, width: 0, height: 0 });
  };

  return common_store.curCategory === "event" && isShiftPressed && createPortal(
    <FullscreenOverlay
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {isDrawing && <SelectionBox x={box.x} y={box.y} width={box.width} height={box.height} />}
    </FullscreenOverlay>,
    portalElement
  );
});

export default DragAreaSelectionBox;


const FullscreenOverlay = styled.div`
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  cursor: crosshair;
`;

const SelectionBox = styled.div`
  position: fixed;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border: 2px dashed #D4ED3E;
`;