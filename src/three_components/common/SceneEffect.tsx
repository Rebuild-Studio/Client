import { Bloom, EffectComposer } from "@react-three/postprocessing";
import SelectedOutline from "../post_processing/SelectedOutline";
import storeContainer from "@/store/storeContainer";
import { observer } from "mobx-react";

const SceneEffect = () => {
  const { bloomToggle } = storeContainer.sceneSettingStore;

  //TODO : SSAO 효과 구현

  return (
    <EffectComposer autoClear={false}>
      <SelectedOutline />
      {bloomToggle ? (
        <Bloom
          kernelSize={3}
          luminanceThreshold={0}
          luminanceSmoothing={0.4}
          intensity={0.6}
        />
      ) : (
        <></>
      )}
    </EffectComposer>
  );
};

const Observer = observer(SceneEffect);
export default Observer;
