import { observer } from 'mobx-react';
import { MxCanvasCore } from '@mv/core';
import createInteractionJson from '@/utils/json/createInteractionJson';
import createMxJson from '@/utils/json/createMxJson';
import createSceneJson from '@/utils/json/createSceneJson';
import projectStore from '@store/project.store.ts';

const Preview = observer(() => {
  const { scene } = projectStore;

  if (!scene) {
    return null;
  }

  const sceneJson = createSceneJson(scene);
  const interactionJson = createInteractionJson();
  const previewJson = createMxJson(sceneJson, interactionJson);

  const data = JSON.stringify(previewJson);
  return <MxCanvasCore data={data} mode={'play'} />;
});

export default Preview;
