import EditableInteraction_VM from '@/interaction(legacyJS)/src/Components/view_models/07. Editable/EditableInteraction_VM';
import { MxJson } from '@/types/mxJson/mxJson';
import { SceneJson } from '@/types/scene/scene';
import optimizeSceneJson from './optimizeSceneJson';

const createMxJson = (
  sceneJson: SceneJson,
  interactionJson: object
): MxJson => {
  optimizeSceneJson(sceneJson);
  const editableInteraction = EditableInteraction_VM().toJson(interactionJson);
  const mxJson = {
    scene: sceneJson,
    interaction: interactionJson,
    editableInteraction: editableInteraction,
    editableScene: []
  };
  return mxJson;
};

export default createMxJson;
