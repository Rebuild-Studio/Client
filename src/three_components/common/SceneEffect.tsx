import { observer } from 'mobx-react';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import storeContainer from '@/store/storeContainer';
import primitiveStore from '@store/primitive.store.ts';
import SelectedOutline from '../post_processing/SelectedOutline';

const SceneEffect = () => {
  const { bloomToggle } = storeContainer.sceneSettingStore;

  //TODO : SSAO 효과 구현

  return (
    <EffectComposer autoClear={false}>
      <SelectedOutline
        meshes={Object.values(primitiveStore.selectedPrimitives)}
      />
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
