import EditableInteraction_VM from '@/interaction(legacyJS)/src/Components/view_models/07. Editable/EditableInteraction_VM';
import { MxJson } from '@/types/mxJson/mxJson';
import { SceneJson, SceneJsonObject } from '@/types/scene/scene';
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
  findLightMeshes(sceneJson.object, null).forEach(({ lightMesh, parent }) => {
    removeLightMesh(lightMesh, parent);
  });
};

const findLightMeshes = (
  obj: SceneJsonObject,
  parent: SceneJsonObject | null,
  result: { lightMesh: SceneJsonObject; parent: SceneJsonObject | null }[] = []
) => {
  if (['POINT_LIGHT', 'SPOT_LIGHT'].includes(obj.name)) {
    result.push({ lightMesh: obj, parent });
  }

  if (obj.children && obj.children.length > 0) {
    for (let i = 0; i < obj.children.length; i++) {
      findLightMeshes(obj.children[i], obj, result);
    }
  }

  return result;
};

const removeLightMesh = (
  lightMesh: SceneJsonObject,
  parent: SceneJsonObject | null
) => {
  const light = lightMesh.children.find((child) =>
    child.type.includes('Light')
  );
  if (light) {
    light.matrix = lightMesh.matrix;
    parent?.children.push(light);
    const lightMeshIndex = parent?.children.findIndex(
      (child) => child.uuid === lightMesh.uuid
    );
    lightMeshIndex && parent?.children.splice(lightMeshIndex, 1);
  }
};

const removeCameraMesh = (sceneJson: SceneJson) => {
  const cameraMeshIndex = sceneJson.object.children.findIndex(
    (child) => child.name === 'PREVIEW_CAMERA'
  );
  const cameraMesh = sceneJson.object.children[cameraMeshIndex];

  if (cameraMesh) {
    const camera = cameraMesh.children.find((child) =>
      child.type.includes('Camera')
    );
    if (camera) {
      const { matrix } = cameraMesh;
      camera.matrix = matrix;
      sceneJson.object.children.splice(cameraMeshIndex, 1);
      sceneJson.object.children.push(camera);
    }
  }
};
