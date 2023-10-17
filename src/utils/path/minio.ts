/**
 * @description
 * 여기에 minio에 업로드할 파일의 경로를 정의합니다.
 * 추가해서 쓰세요
 * @example
 * myProject: `project/id/${fileName}.json`
 */
const minioPath = (fileName: string) =>
  ({
    libraryThumbnail: `models/Objects/${fileName}.png`,
    libraryGlb: `models/Objects/${fileName}.glb`,
  }) as const;

type MinioPathKeys = keyof ReturnType<typeof minioPath>;

/**
 *
 * @param fileName 불러올 파일 명 (확장자 제외)
 * @param type 기존 정의타입 (minioPathKeys 참고)
 * @returns
 */
const getMinioPath = (fileName: string, type: MinioPathKeys) => {
  const path = import.meta.env.VITE_MINIO_PATH + minioPath(fileName)[type];
  return path;
};

export default getMinioPath;
