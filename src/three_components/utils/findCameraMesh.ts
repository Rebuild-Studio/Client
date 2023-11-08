import { SceneJsonObject } from '@/types/scene/scene';

export function findCameraMesh(
  obj: SceneJsonObject,
  result: SceneJsonObject[] = []
) {
  if (['PREVIEW_CAMERA'].includes(obj.name)) {
    result.push(obj);
  }

  if (obj.children && obj.children.length > 0) {
    for (let i = 0; i < obj.children.length; i++) {
      findCameraMesh(obj.children[i], result);
    }
  }

  return result;
}
