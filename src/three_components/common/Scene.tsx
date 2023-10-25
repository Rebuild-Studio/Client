import { Canvas } from "@react-three/fiber";
import RenderScene from "../scene/RenderScene";
import Grid from "./Grid";
import styled from "styled-components";
import { basicColors, bgColors } from "@/resources/colors/colors";
import storeContainer from "@/store/storeContainer";
import { observer } from "mobx-react";
import ContextMenu from "@/components/layout/contextMenu/ContextMenu";
import { CanvasHelper } from "./CanvasHelper";

const Scene = observer(() => {
  const { mouseEventStore, contextMenuStore, projectStateStore } =
    storeContainer;

  return (
    <Wrapper>
      {contextMenuStore.isContextMenuOpened && (
        <ContextMenu
          items={contextMenuStore.currentContextMenuType!.items}
          $xPos={contextMenuStore.currentContextMenuType!.xPos}
          $yPos={contextMenuStore.currentContextMenuType!.yPos}
        />
      )}
      <CustomCanvas
        id="canvas"
        camera={{ fov: 50, position: [0, 2, 3.0] }}
        onMouseDown={(e) => {
          mouseEventStore.updateMouseEvent("onMouseDown", e);
        }}
        onMouseMove={(e) => {
          mouseEventStore.updateMouseEvent("onMouseMove", e);
        }}
        onMouseUp={(e) => {
          mouseEventStore.updateMouseEvent("onMouseUp", e);
        }}
        onClick={(e) => {
          mouseEventStore.updateMouseEvent("onClick", e);
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          mouseEventStore.updateMouseEvent("onContextMenu", e);
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
          mouseEventStore.updateMouseEvent("onDrop", e);
        }}
      >
        <ambientLight intensity={1} visible={true} color={basicColors.white} />
        <directionalLight
          castShadow
          shadow-bias={-0.0001}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          intensity={2.5}
          color={basicColors.white}
          position={[-10, 18, 11.5]}
          visible={true}
          shadow-camera-left={-30}
          shadow-camera-right={30}
          shadow-camera-top={30}
          shadow-camera-bottom={-30}
        ></directionalLight>
        <Grid visible={projectStateStore.gridVisible === "VISIBLE"} />
        <CanvasHelper />
        <RenderScene />
      </CustomCanvas>
    </Wrapper>
  );
});

export default Scene;

const Wrapper = styled.div`
  height: 100%;
`;

const CustomCanvas = styled(Canvas)`
  background-color: ${bgColors.sceneBackground};
`;
