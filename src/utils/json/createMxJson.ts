import EditableInteraction_VM from '@/interaction(legacyJS)/src/Components/view_models/07. Editable/EditableInteraction_VM';
import { findLightMeshes } from '@/three_components/utils/findLightMeshes.ts';
import { MxJson } from '@/types/mxJson/mxJson';
import { SceneJson } from '@/types/scene/scene';
import optimizeSceneJson from './optimizeSceneJson';

const createMxJson = (
  sceneJson: SceneJson,
  interactionJson: object
): MxJson => {
  removeLightMeshes(sceneJson);
  removeCameraMesh(sceneJson);

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

const removeLightMeshes = (sceneJson: SceneJson) => {
  const lightMeshes = findLightMeshes(sceneJson.object);
  lightMeshes.forEach((lightMesh) => {
    const light = lightMesh.children.find((child) =>
      child.type.includes('Light')
    );
    if (light) {
      const { matrix } = lightMesh;
      light.name = lightMesh.name;
      light.matrix = matrix;
      sceneJson.object.children.push(light);
      lightMesh.visible = false;
      lightMesh.children = [];
    }
  });
};

const removeCameraMesh = (sceneJson: SceneJson) => {
  const cameraMesh = sceneJson.object.children.find(
    (child) => child.name === 'PREVIEW_CAMERA'
  );
  if (cameraMesh) {
    const camera = cameraMesh.children.find((child) =>
      child.type.includes('Camera')
    );
    if (camera) {
      const { matrix } = cameraMesh;
      camera.name = cameraMesh.name;
      camera.matrix = matrix;
      sceneJson.object.children.push(camera);
      cameraMesh.visible = false;
      cameraMesh.children = [];
    }
  }
};
