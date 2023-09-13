import TopBar from "./components/TopBar";
import AppWrapper from "./components/layout/wrapper/AppWrapper";
import Scene from "./three_components/common/Scene";

const App = () => {
  return (
    <AppWrapper>
      <TopBar />
      <Scene />
    </AppWrapper>
  );
};

export default App;
