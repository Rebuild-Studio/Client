import { MxJson } from '@/types/mxJson/mxJson';
import { SceneJson } from '@/types/scene/scene';
import optimizeSceneJson from './optimizeSceneJson';

const createMxJson = (sceneJson: SceneJson, interactionJson: any): MxJson => {
  optimizeSceneJson(sceneJson);
  const mxJson = {
    scene: sceneJson,
    interaction: interactionJson,
    editableScene: [],
    editableInteraction: []
  };
  return mxJson;
};

export default createMxJson;
