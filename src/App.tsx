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

const App = observer(() => {
  const { projectStateStore } = storeContainer;
  const [barOpen, setBarOpen] = useState(true);

  return (
    <>
      <AppWrapper>
        <Header>
          <MenuBar />
          <TopBar isOpen={barOpen} setOpen={setBarOpen} />
        </Header>
        <Main>
          <Scene />
          <Tools canvasBarIsOpen={barOpen} />
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
