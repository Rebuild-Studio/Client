import { useState } from 'react';
import { observer } from 'mobx-react';
import storeContainer from '@/store/storeContainer';
import primitiveStore from '@store/primitive.store.ts';
import SceneSettingPanel from './SceneSettingPanel';
import ShapeEditor from './ShapeEditor';
import TransformMaterialEditor from './TransformMaterialEditor';
import Panel from '../../layout/Panel/Panel';
import Tab from '../../layout/Tab';

const RightPanel = () => {
  const { selectedPrimitives, numOfSelectedPrimitives } = primitiveStore;
  const [activeTab, setActiveTab] = useState(0);
  const selectedPrimitive = Object.values(selectedPrimitives)[0];
  const { sceneSettingStore } = storeContainer;

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };
  if (!selectedPrimitive) {
    return null;
  }

  if (sceneSettingStore.type === 'scene') {
    return <SceneSettingPanel />;
  }

  const isLight =
    numOfSelectedPrimitives === 1 &&
    ['POINT_LIGHT', 'SPOT_LIGHT'].includes(selectedPrimitive.name);
  const isPrimitive =
    numOfSelectedPrimitives === 1 &&
    ['CUBE', 'COME', 'CAPSULE', 'CYLINDER', 'SPHERE', 'TORUS'].includes(
      selectedPrimitive.name
    );
  const tabs = isPrimitive ? ['오브젝트', '쉐이프'] : ['오브젝트'];

  return (
    <Panel label={'속성값'} options={undefined}>
      <Tab tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
      {activeTab === 0 && <TransformMaterialEditor isLight={isLight} />}
      {activeTab === 1 && <ShapeEditor />}
    </Panel>
  );
};

const Observer = observer(RightPanel);
export default Observer;
