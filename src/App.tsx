import MenuBar from "./components/MenuBar";
import StudioLayout from "./components/layout/StudioLayout";
import AppWrapper from "./components/layout/wrapper/AppWrapper";
import Scene from "./three_components/common/Scene";
import ToastContainer from "@components/common/ToastContainer.tsx";

const App = () => {
  return (
    <AppWrapper>
      <MenuBar />
      <StudioLayout />
      <Scene />
      <ToastContainer />
    </AppWrapper>
  );
};

export default App;
