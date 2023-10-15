import { observer } from "mobx-react";
import MenuBar from "./components/MenuBar";
import StudioLayout from "./components/layout/StudioLayout";
import SceneSettingPanel from "./components/common/RightPanel/SceneSettingPanel";
import AppWrapper from "./components/layout/wrapper/AppWrapper";
import storeContainer from "./store/storeContainer";
import Scene from "./three_components/common/Scene";
import ToastContainer from "@components/common/ToastContainer.tsx";
import ControllerBar from "@components/ControllerBar";

const App = observer(() => {
  const { sceneSettingStore } = storeContainer;

  return (
    <AppWrapper>
      <MenuBar />
      <StudioLayout />
      {sceneSettingStore.type === "scene" && <SceneSettingPanel />}
      <Scene />
      <ControllerBar />
      <ToastContainer />
    </AppWrapper>
  );
});

export default App;
