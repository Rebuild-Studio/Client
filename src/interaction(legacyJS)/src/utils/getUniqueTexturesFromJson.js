/**
 * @description 중복된 텍스쳐 이미지를 제거합니다.
 * @param {JSON Object/Scene format} sceneJson - 씬 정보가 담긴 JSON 객체
 */
function getUniqueTexturesFromJson(sceneJson) {
  const textureImages = sceneJson.images;

  const textureHashMap = new Map();

  // 텍스쳐 이미지 순회 및 중복 제거
  for (const textureImage of textureImages) {
    if (!textureImage.url) continue;

    const getIdOfDuplicatedImage = textureHashMap.get(textureImage.url);
    if (getIdOfDuplicatedImage) {
      textureImage.url = `duplicated:${getIdOfDuplicatedImage}`;
    } else {
      textureHashMap.set(textureImage.url, textureImage.uuid);
    }
  }
  textureHashMap.clear();
}
export default getUniqueTexturesFromJson;
