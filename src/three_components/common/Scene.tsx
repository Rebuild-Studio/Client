import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import RenderScene from "../scene/RenderScene";
import Grid from "./Grid";
import styled from "styled-components";
import { basicColors, bgColors } from "@/resources/colors/colors";
import storeContainer from "@/store/storeContainer";
import { observer } from "mobx-react";
import ContextMenu from "@/components/layout/contextMenu/ContextMenu";
import { CanvasLeftPanel } from "@/components/layout/CanvasLeftPanel/CanvasLeftPanel";
import { Suspense, useState } from "react";
import { useFileLoader } from "@/hooks/loader";
import * as THREE from "three";

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  top: 78px;
  height: calc(100vh - ${78}px);
  display: flex;
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  bottom: 0%;
  display: flex;
  flex-direction: column;
`;

const CustomCanvas = styled(Canvas)`
  width: "100%";
  height: "100%";
  background-color: ${bgColors.sceneBackground};
`;

// TODO : 코드 분리 필요
// TODO : 트랜스 컨트롤 적용 되도록 구현해야함
const LoadedObject = ({ fileList }: { fileList: FileList }) => {
  const result = useFileLoader(fileList);

  return (
    <>
      {result.map((obj) => {
        if (!(obj instanceof THREE.Group)) {
          return <primitive object={obj.scene} key={obj.scene.uuid} />;
        } else {
          return <primitive object={obj} key={obj.uuid} />;
        }
      })}
    </>
  );
};

const Scene = observer(() => {
  const { mouseEventStore, contextMenuStore, projectStateStore } =
    storeContainer;

  // TODO : 코드 정리 및 분리 필요
  const [fileList, setFileList] = useState<FileList>();
  const dropHandler: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      setFileList(files);
    }
  };

  return (
    <Wrapper>
      <Container>
        {contextMenuStore.isContextMenuOpened && (
          <ContextMenu
            items={contextMenuStore.currentContextMenuType!.items}
            xPos={contextMenuStore.currentContextMenuType!.xPos}
            yPos={contextMenuStore.currentContextMenuType!.yPos}
          />
        )}
        <CustomCanvas
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
          // DND
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={dropHandler}
        >
          <ambientLight
            intensity={1}
            visible={true}
            color={basicColors.white}
          />
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
          {projectStateStore.gridVisible === "VISIBLE" && <Grid />}
          <OrbitControls enableDamping={false} makeDefault={true} />
          <RenderScene />
          <Suspense fallback={null}>
            {fileList && <LoadedObject fileList={fileList} />}
          </Suspense>
        </CustomCanvas>
        <CanvasLeftPanel />
      </Container>
    </Wrapper>
  );
});

export default Scene;
