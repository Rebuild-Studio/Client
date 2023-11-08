import { SceneJsonObject } from '@/types/scene/scene';

export function findLightMeshes(
  obj: SceneJsonObject,
  result: SceneJsonObject[] = []
) {
  if (['POINT_LIGHT', 'SPOT_LIGHT'].includes(obj.name)) {
    result.push(obj);
  }

  if (obj.children && obj.children.length > 0) {
    for (let i = 0; i < obj.children.length; i++) {
      findLightMeshes(obj.children[i], result);
    }
  }

  return result;
}
