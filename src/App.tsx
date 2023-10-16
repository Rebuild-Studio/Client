import { observer } from "mobx-react";
import MenuBar from "./components/MenuBar";
import StudioLayout from "./components/layout/StudioLayout";
import SceneSettingPanel from "./components/common/RightPanel/SceneSettingPanel";
import AppWrapper from "./components/layout/wrapper/AppWrapper";
import storeContainer from "./store/storeContainer";
import Scene from "./three_components/common/Scene";
import ToastContainer from "@components/common/ToastContainer.tsx";
import ControllerBar from "@/features/controllerBar";
import Modal from "./components/layout/modal/Modal";
import ReactDOM from "react-dom";


const App = observer(() => {
  const { sceneSettingStore, projectStateStore } = storeContainer;

  return (
    <AppWrapper>
      {projectStateStore.isModalOpened &&
        ReactDOM.createPortal(
          <Modal />,
          document.getElementById("modal-root")!
        )}
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
