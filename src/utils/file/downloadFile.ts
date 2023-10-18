/**
 *
 * @param {BlobPart} content - 입력 타입(JSON, obj, txt, etc...)
 * @param {string} fileName
 * @param {"json" | "txt"} contentType - 출력 파일 타입(json, txt, etc...)
 * @example
 * downloadFile(JSON.stringify(sceneJson), "scene.json", "json");
 */
async function downloadFile<T extends BlobPart, R extends "json" | "txt">(
  content: T,
  fileName: string,
  contentType: R
): Promise<void> {
  const file = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(file);

  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const downloadUrl = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = fileName;
    a.click();

    URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error("Download failed:", error);
  } finally {
    URL.revokeObjectURL(url);
  }
}
export default downloadFile;
