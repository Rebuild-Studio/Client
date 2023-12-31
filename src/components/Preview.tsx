import { observer } from 'mobx-react';
import { MxCanvasCore } from '@mv/core';
import storeContainer from '@/store/storeContainer';
import createMxJson from '@/utils/json/createMxJson';
import legacyStoreContainer from '../interaction(legacyJS)/src/Components/stores/storeContainer';

const Preview = observer(() => {
  const { projectStore } = storeContainer;
  const { eventSystem_store } = legacyStoreContainer;
  const sceneJson = projectStore.scene?.toJSON();
  const interactionJson = JSON.parse(
    JSON.stringify(eventSystem_store.toJSON())
  );
  const previewJson = createMxJson(sceneJson, interactionJson);
  const data = JSON.stringify(previewJson);
  return <MxCanvasCore data={data} mode={'play'} />;
});

export default Preview;
