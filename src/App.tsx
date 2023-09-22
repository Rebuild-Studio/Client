import TopBar from "./components/TopBar";
import RightPanel from "./components/common/RightPanel/RightPanel";
import AppWrapper from "./components/layout/wrapper/AppWrapper";
import Scene from "./three_components/common/Scene";
const App = () => {
  return (
    <AppWrapper>
      <TopBar />
      <RightPanel />
      <Scene />
    </AppWrapper>
  );
};

export default App;
