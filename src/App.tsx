import { observer } from "mobx-react";
import MenuBar from "./components/MenuBar";
import AppWrapper from "./components/layout/wrapper/AppWrapper";
import storeContainer from "./store/storeContainer";
import Scene from "./three_components/common/Scene";
import ToastContainer from "@components/common/ToastContainer";
import Modal from "./components/layout/modal/Modal";
import ReactDOM from "react-dom";
import styled from "styled-components";
import TopBar from "@components/TopBar";
import Tools from "@components/layout/Tools";
import editorModeStore from "@store/editorModeStore.ts";
import InteractionEditor from "@components/InteractionEditor.tsx";
import Preivew from "@/components/Preview";

const App = observer(() => {
  const { projectStateStore } = storeContainer;
  const { editorMode } = editorModeStore;

  return (
    <>
      <AppWrapper>
        <Header>
          <MenuBar />
          <TopBar />
        </Header>
        <Main>
          <EditorWrapper $visible={editorMode === "canvas"}>
            <Scene />
            <Tools />
          </EditorWrapper>
          <EditorWrapper $visible={editorMode === "interaction"}>
            <InteractionEditor />
          </EditorWrapper>
          <EditorWrapper $visible={editorMode === "preview"}>
            {editorMode === "preview" && <Preivew />}
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
  min-height: 0;
  min-width: 0;
`;

const EditorWrapper = styled.div<{ $visible: boolean }>`
  display: ${({ $visible }) => ($visible ? "block" : "none")};
  height: 100%;
  position: relative;
`;
