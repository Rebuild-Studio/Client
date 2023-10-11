import { common_store } from "../Components/stores/Common_Store";
import EditableInteraction_VM from "../Components/view_models/07. Editable/EditableInteraction_VM";
import EditableScene_VM from "../Components/view_models/07. Editable/EditableScene_VM";
import optimizeSceneJson from "./optimizeSceneJson";

const createMxJson = (sceneJson, interactionJson) => {
  optimizeSceneJson(sceneJson);
  const mxJson = {
    scene: sceneJson,
    interaction: interactionJson,
    editableScene: EditableScene_VM().toJson(),
    editableInteraction: EditableInteraction_VM().toJson(),
  };
  renderingContext_store.setTransformControls(common_store.transcontrol);

  return mxJson;
};

export default createMxJson;
