import { SceneJson } from "@/types/scene/scene";
import optimizeSceneJson from "./optimizeSceneJson";
import { MxJson } from "@/types/mxJson/mxJson";

const createMxJson = (sceneJson: SceneJson, interactionJson: any): MxJson => {
  optimizeSceneJson(sceneJson);
  const mxJson = {
    scene: sceneJson,
    //TODO - 추후 인터랙션 반영시 구현(최준만)
    interaction: interactionJson,
    editableScene: [],
    editableInteraction: [],
  };
  return mxJson;
};

export default createMxJson;
