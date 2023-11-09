import { SceneJson } from '@/types/scene/scene';
import optimizeSceneJson from './optimizeSceneJson';

const createSceneJson = (
  scene: THREE.Scene,
  optimize: boolean = true
): SceneJson => {
  const sceneJson: SceneJson = scene.toJSON();
  if (optimize) {
    optimizeSceneJson(sceneJson);
  }
  return sceneJson;
};

export default createSceneJson;
