import { observer } from "mobx-react";
import MenuBar from "./components/MenuBar";
import AppWrapper from "./components/layout/wrapper/AppWrapper";
import storeContainer from "./store/storeContainer";
import Scene from "./three_components/common/Scene";
import ToastContainer from "@components/common/ToastContainer";
import Modal from "./components/layout/modal/Modal";
import ReactDOM from "react-dom";
import styled from "@emotion/styled";
import { useState } from "react";
import TopBar from "@components/TopBar";
import Tools from "@components/layout/Tools";
import InteractionEditor from "@/interaction(legacyJS)/src/App";
import editorModeStore from "@store/editorModeStore.ts";

const App = observer(() => {
  const { projectStateStore } = storeContainer;
  const [canvasBarOpen, setCanvasBarOpen] = useState(true);
  const { editorMode } = editorModeStore;

  return (
    <>
      <AppWrapper>
        <Header>
          <MenuBar />
          <TopBar isOpen={canvasBarOpen} setOpen={setCanvasBarOpen} />
        </Header>
        <Main>
          <EditorWrapper $visible={editorMode === "canvas"}>
            <Scene />
            <Tools canvasBarIsOpen={canvasBarOpen} />
          </EditorWrapper>
          <EditorWrapper $visible={editorMode === "interaction"}>
            <InteractionEditor />
          </EditorWrapper>
        </Main>
      </AppWrapper>
      {projectStateStore.isModalOpened &&
        ReactDOM.createPortal(
          <Modal />,
          document.getElementById("modal-root")!
        )}
      <ToastContainer />
    </>
  );
});

export default App;

const Header = styled.header``;

const Main = styled.main`
  position: relative;
  flex: 1;
`;

const EditorWrapper = styled.div<{ $visible: boolean }>`
  display: ${({ $visible }) => ($visible ? "block" : "none")};
  height: 100%;
`;
