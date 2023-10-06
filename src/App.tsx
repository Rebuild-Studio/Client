import MenuBar from "./components/MenuBar";
import TopBar from "./components/TopBar";
import RightPanel from "./components/common/RightPanel/RightPanel";
import AppWrapper from "./components/layout/wrapper/AppWrapper";
import Scene from "./three_components/common/Scene";
import ToastContainer from "@components/common/ToastContainer.tsx";

const App = () => {
  return (
    <AppWrapper>
      <MenuBar />
      <TopBar />
      <RightPanel />
      <Scene />
      <ToastContainer />
    </AppWrapper>
  );
};

export default App;
