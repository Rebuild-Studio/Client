import { useState } from 'react';
import { observer } from 'mobx-react';
import Panel from '../../layout/Panel/Panel';
import Tab from '../../layout/Tab';
import ShapeEditor from './ShapeEditor';
import TransformMaterialEditor from './TransformMaterialEditor';
import SceneSettingPanel from './SceneSettingPanel';
import storeContainer from '@/store/storeContainer';

const RightPanel = () => {
  const { primitiveStore } = storeContainer;
  const [activeTab, setActiveTab] = useState(0);
  const selectedPrimitive = Object.values(primitiveStore.selectedPrimitives)[0];
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

  return (
    <Panel label={'속성값'} options={undefined}>
      <Tab
        tabs={['오브젝트', '쉐이프']}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      {activeTab === 0 && <TransformMaterialEditor />}
      {activeTab === 1 && <ShapeEditor />}
    </Panel>
  );
};

const Observer = observer(RightPanel);
export default Observer;
