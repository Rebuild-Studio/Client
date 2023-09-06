import { ObjectMap, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader, GLTF } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { KTX2Loader } from "three/addons/loaders/KTX2Loader.js";
import * as THREE from "three";

// TODO : 주소 따로 관리 필요
const MINIO_URL = "https://dev.mxstudio.app/storage/";
const MATERIAL_DIR = "models/MaterialTemplates/";

export const useGLTFLoader = (
  fileNameList: string[],
  dir: string
): (GLTF & ObjectMap)[] => {
  const gl = useThree((state) => state.gl);
  const urlList = fileNameList.map((value) => MINIO_URL + dir + value);
  return useLoader(GLTFLoader, urlList, (loader: GLTFLoader) => {
    //set KTX transcoder for loading
    const ktx2Loader = new KTX2Loader();
    ktx2Loader.setTranscoderPath("/gltf/basis/");
    ktx2Loader.detectSupport(gl);
    loader.setKTX2Loader(ktx2Loader);

    //set Draco decoder for loading
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/gltf/draco/");
    loader.setDRACOLoader(dracoLoader);
  });
};

export const useTextureLoader = (
  fileNameList: string[],
  dir: string
): THREE.Texture[] => {
  const urlList = fileNameList.map((value) => MINIO_URL + dir + value);
  return useLoader(THREE.TextureLoader, urlList);
};

//////////////////////////////////////////////////////////////////////

export const useMaterialLoader = (name: string): THREE.Material => {
  const [object] = useGLTFLoader([`${name}.glb`], MATERIAL_DIR);

  let result;
  for (const materialName in object.materials) {
    result = object.materials[materialName];
    return result;
  }

  return result!;
};
