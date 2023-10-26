import { SceneJson } from '@/types/scene/scene';
import getUniqueGeometriesFromJson from './getUniqueGeometriesFromJson';
import getUniqueTexturesFromJson from './getUniqueTexturesFromJson';

/**
 *
 * @param {object} sceneJson
 */
function optimizeSceneJson(sceneJson: SceneJson) {
  sceneJson.geometries && getUniqueGeometriesFromJson(sceneJson);
  sceneJson.images && getUniqueTexturesFromJson(sceneJson);
}

export default optimizeSceneJson;
