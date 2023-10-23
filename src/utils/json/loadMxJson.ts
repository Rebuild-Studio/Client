import { MxJson } from "@/types/mxJson/mxJson";
import { SceneJson } from "@/types/scene/scene";

type SceneGeometries = SceneJson["geometries"];
type SceneImages = SceneJson["images"];

const convertGeometries = async (
  geometries: SceneGeometries
): Promise<SceneGeometries> => {
  const geometryUrls = geometries.map((geometry) => {
    if (geometry.data) {
      return geometry.data;
    } else {
      return "";
    }
  });
  const convertedGeometries = Promise.allSettled(
    geometryUrls.map((url) => fetch(url).then((response) => response.json()))
  ).then((results) => {
    return results.map((result, index) => {
      if (result.status === "fulfilled") {
        return { ...geometries[index], data: result.value };
      } else {
        if ("data" in geometries[index]) {
          return { ...geometries[index], data: {} };
        } else {
          return { ...geometries[index] };
        }
      }
    });
  });

  return convertedGeometries;
};

const convertImages = (images: SceneImages): Promise<SceneImages> => {
  const imageUrls = images.map((image: { url: string }) => {
    if (image.url && typeof image.url === "string") {
      return image.url;
    } else {
      return "";
    }
  });

  const convertedImages: Promise<SceneJson["images"]> = Promise.allSettled(
    imageUrls.map((url) =>
      fetch(url)
        .then((response) => {
          return response.blob();
        })
        .then((blob) => {
          return new Promise((resolve, reject) => {
            if (blob.type !== "image/png") {
              reject(new Error("wrong image type"));
            }
            const reader = new FileReader();
            reader.onloadend = function () {
              resolve(reader.result);
            };
            reader.onerror = function () {
              reject(new Error("error"));
            };
            reader.readAsDataURL(blob);
          });
        })
    )
  ).then((results) => {
    return results.map((result, index) => {
      if (result.status === "fulfilled") {
        return { ...images[index], url: (result.value as string) ?? "" };
      } else {
        return { ...images[index], url: images[index].url };
      }
    });
  });

  return convertedImages;
};

const loadMxJson = async (jsonData: MxJson): Promise<MxJson> => {
  const geometries = jsonData.scene.geometries;
  const images = jsonData.scene.images;

  // geometry 변환
  const convertedGeometries = geometries ? convertGeometries(geometries) : [];

  // images 변환
  const convertedImages = images ? convertImages(images) : [];

  return {
    ...jsonData,
    scene: {
      ...jsonData.scene,
      geometries: await convertedGeometries,
      images: await convertedImages,
    },
  };
};

export default loadMxJson;
