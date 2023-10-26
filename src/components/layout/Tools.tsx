import CanvasBar from "@components/CanvasBar";
import { CanvasLeftPanel } from "@components/layout/CanvasLeftPanel/CanvasLeftPanel";
import { OrientationHelper } from "@/three_components/common/OrientationHelper";
import SceneSettingPanel from "@components/common/RightPanel/SceneSettingPanel";
import RightPanel from "@components/common/RightPanel/RightPanel";
import ControllerBar from "@/features/controllerBar";
import styled from "styled-components";
import storeContainer from "@store/storeContainer";
import { observer } from "mobx-react";
import editorModeStore from "@store/editorModeStore.ts";

const Tools = observer(() => {
  const { sceneSettingStore } = storeContainer;
  const { canvasBarOpen } = editorModeStore;

  return (
    <>
      <Layout>
        <Top>{canvasBarOpen && <CanvasBar />}</Top>
        <Bottom>
          <Left>
            <CanvasLeftPanel />
          </Left>
          <Right>
            <OrientationHelperWrapper>
              <OrientationHelper />
            </OrientationHelperWrapper>
            <PanelWrapper>
              {sceneSettingStore.isOpen && <SceneSettingPanel />}
              <RightPanel />
            </PanelWrapper>
          </Right>
        </Bottom>
      </Layout>
      <ControllerBar />
    </>
  );
});

export default Tools;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const Top = styled.div`
  pointer-events: auto;
`;

const Bottom = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const Left = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
`;

const Right = styled.div`
  display: flex;
  pointer-events: none;
  position: absolute;
  right: 0;
  height: 100%;
`;

const OrientationHelperWrapper = styled.div`
  height: fit-content;
  pointer-events: auto;
  margin-top: 10px;
  margin-right: 20px;
`;

const PanelWrapper = styled.div`
  pointer-events: auto;
`;
