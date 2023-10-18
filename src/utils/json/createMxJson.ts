import { SceneJson } from "@/types/scene/scene";
import optimizeSceneJson from "./optimizeSceneJson";
import { MxJson } from "@/types/mxJson/mxJson";

const createMxJson = (sceneJson: SceneJson, interactionJson: any): MxJson => {
  optimizeSceneJson(sceneJson);
  const mxJson = {
    scene: sceneJson,
    interaction: interactionJson,
    editableScene: [],
    editableInteraction: [],
  };
  return mxJson;
};

export default createMxJson;
