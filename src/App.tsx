import { observer } from "mobx-react";
import MenuBar from "./components/MenuBar";
import TopBar from "./components/TopBar";
import RightPanel from "./components/common/RightPanel/RightPanel";
import SceneSettingPanel from "./components/common/RightPanel/SceneSettingPanel";
import AppWrapper from "./components/layout/wrapper/AppWrapper";
import storeContainer from "./store/storeContainer";
import Scene from "./three_components/common/Scene";
import ToastContainer from "@components/common/ToastContainer.tsx";

const App = observer(() => {
  return (
    <AppWrapper>
      <MenuBar />
      <TopBar />
      {storeContainer.rightPanelStore.getType() === "scene" && (
        <SceneSettingPanel />
      )}
      <RightPanel />
      <Scene />
      <ToastContainer />
    </AppWrapper>
  );
});

export default App;
