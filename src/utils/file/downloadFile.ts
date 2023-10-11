/**
 *
 * @param {BlobPart} content - 입력 타입(JSON, obj, txt, etc...)
 * @param {string} fileName
 * @param {"json" | "txt"} contentType - 출력 파일 타입(json, txt, etc...)
 * @example
 * downloadFile(JSON.stringify(sceneJson), "scene.json", "json");
 */
function downloadFile<T extends BlobPart, R extends "json" | "txt">(
  content: T,
  fileName: string,
  contentType: R
) {
  const a = document.createElement("a");
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(a.href);
}

export default downloadFile;
