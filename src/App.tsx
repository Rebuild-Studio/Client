import { observer } from "mobx-react";
import ReactDOM from "react-dom";
import ControllerBar from "@/features/controllerBar";
import ToastContainer from "@components/common/ToastContainer.tsx";
import MenuBar from "./components/MenuBar";
import StudioLayout from "./components/layout/StudioLayout";
import Modal from "./components/layout/modal/Modal";
import AppWrapper from "./components/layout/wrapper/AppWrapper";
import storeContainer from "./store/storeContainer";
import Scene from "./three_components/common/Scene";

const App = observer(() => {
  const { projectStateStore } = storeContainer;

  return (
    <AppWrapper>
      {projectStateStore.isModalOpened &&
        ReactDOM.createPortal(
          <Modal />,
          document.getElementById("modal-root")!,
        )}
      <MenuBar />
      <StudioLayout />
      <Scene />
      <ControllerBar />
      <ToastContainer />
    </AppWrapper>
  );
});

export default App;
