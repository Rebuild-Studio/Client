import hash from "object-hash";

/**
 * @description 지오메트리 값을 object hash를 통해 hash값으로 변환하고, 중복된 지오메트리를 제거합니다.
 * @param {JSON Object/Scene format} sceneJson - 씬 정보가 담긴 JSON 객체
 */
function getUniqueGeometriesFromJson(sceneJson) {
  const geometries = sceneJson.geometries;
  const geometryHashMap = new Map();

  // 지오메트리 순회 및 중복 제거
  for (const geometry of geometries) {
    if (!geometry.data) continue;

    const geometryHashValue = hash(geometry.data);

    if (geometryHashMap.get(geometryHashValue)) {
      geometry.data = `duplicated:${geometryHashMap.get(geometryHashValue)}`;
    } else {
      geometryHashMap.set(geometryHashValue, geometry.uuid);
    }
  }
  geometryHashMap.clear();
}
export default getUniqueGeometriesFromJson;
