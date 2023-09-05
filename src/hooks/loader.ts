import { ObjectMap, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader, GLTF } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { KTX2Loader } from "three/addons/loaders/KTX2Loader.js";
import * as THREE from "three";

const MINIO_URL = "https://dev.mxstudio.app/storage/";
const MATERIAL_DIR = "models/MaterialTemplates/";

export const useGLTFLoader = (
  urlList: string[],
  dir: string
): (GLTF & ObjectMap)[] => {
  const gl = useThree((state) => state.gl);
  return useLoader(
    GLTFLoader,
    urlList.map((value) => MINIO_URL + dir + value),
    (loader: GLTFLoader) => {
      //set KTX transcoder for loading
      const ktx2Loader = new KTX2Loader();
      ktx2Loader.setTranscoderPath("/gltf/basis/");
      ktx2Loader.detectSupport(gl);
      loader.setKTX2Loader(ktx2Loader);

      //set Draco decoder for loading
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("/gltf/draco/");
      loader.setDRACOLoader(dracoLoader);
    }
  );
};

export const useTextureLoader = (
  urlList: string[],
  dir: string
): THREE.Texture[] => {
  return useLoader(
    THREE.TextureLoader,
    urlList.map((value) => MINIO_URL + dir + value)
  );
};

//////////////////////////////////////////////////////////////////////

export const useMaterialLoader = (name: string): THREE.Material => {
  const [object] = useGLTFLoader([`${name}.glb`], MATERIAL_DIR);

  let result;
  for (const materialName in object.materials) {
    result = object.materials[materialName];
    break;
  }

  return result!;
};
