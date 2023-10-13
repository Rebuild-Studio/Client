import getUniqueGeometriesFromJson from "./getUniqueGeometriesFromJson";
import getUniqueTexturesFromJson from "./getUniqueTexturesFromJson";

/**
 *
 * @param {object} sceneJson
 */
function optimizeSceneJson(sceneJson) {
  getUniqueGeometriesFromJson(sceneJson);
  getUniqueTexturesFromJson(sceneJson);
}

export default optimizeSceneJson;
