import { observer } from 'mobx-react';
import { MxCanvasCore } from '@mv/core';
import createMxJson from '@/utils/json/createMxJson';
import projectStore from '@store/project.store.ts';
import legacyStoreContainer from '../interaction(legacyJS)/src/Components/stores/storeContainer';

const Preview = observer(() => {
  const { scene } = projectStore;
  const { eventSystem_store } = legacyStoreContainer;

  if (!scene) {
    return null;
  }

  const sceneJson = scene.toJSON();
  const interactionJson = JSON.parse(
    JSON.stringify(eventSystem_store.toJSON())
  );
  const previewJson = createMxJson(sceneJson, interactionJson);
  console.log(previewJson);

  const data = JSON.stringify(previewJson);
  return <MxCanvasCore data={data} mode={'play'} />;
});

export default Preview;
