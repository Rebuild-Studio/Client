import * as THREE from "three";
import { ObjectMap, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader, GLTF } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { KTX2Loader } from "three/addons/loaders/KTX2Loader.js";
import { FileLoader } from "./fileLoader";

// TODO : 주소 따로 관리 필요
const MINIO_URL = "https://dev.mxstudio.app/storage/";
const MATERIAL_DIR = "models/MaterialTemplates/";

// glb, gltf 로더
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

// 텍스쳐 로더
export const useTextureLoader = (
  fileNameList: string[],
  dir: string
): THREE.Texture[] => {
  const urlList = fileNameList.map((value) => MINIO_URL + dir + value);
  return useLoader(THREE.TextureLoader, urlList);
};

// 서버에서 머테리얼 오브젝트 로드하여 머테리얼 반환
export const useMaterialLoader = (name: string): THREE.Material => {
  const [object] = useGLTFLoader([`${name}.glb`], MATERIAL_DIR);

  const materials = object.materials;
  return materials[Object.keys(materials)[0] ?? 0];
};

// 로컬 파일 로더
export const useLocalFileLoader = async (
  files: FileList
): Promise<THREE.Object3D<THREE.Event>[]> => {
  const fileList = Array.from(files);
  const filesMap = fileList.reduce<Record<string, File>>((acc, file) => {
    acc[file.name] = file;
    return acc;
  }, {});

  const objectURLs: string[] = [];
  const manager = new THREE.LoadingManager();
  manager.setURLModifier((url) => {
    url = url.replace(/^(\.?\/)/, ""); // remove './'

    if (filesMap[url]) {
      return URL.createObjectURL(filesMap[url]);
    }
    objectURLs.push(url);
    return url;
  });

  const promiseList = fileList.map((file) => {
    const extension = file.name.split(".").pop()?.toLocaleLowerCase();
    let loader = null;

    switch (extension) {
      case "glb":
      case "gltf":
        loader = FileLoader.instance.gltfLoader;
        //set Draco decoder for loading
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath("/gltf/draco/");
        loader.setDRACOLoader(dracoLoader);
        break;
      case "obj":
        loader = FileLoader.instance.objLoader;
        break;
      default:
        break;
    }

    if (loader) {
      loader.manager = manager;
      return loader.loadAsync(file.name);
    } else {
      console.warn("불가능한 확장자 :", file.name);
      return Promise.reject();
    }
  });

  const fulfilledList = (await Promise.allSettled(promiseList)).filter(
    (result): result is PromiseFulfilledResult<GLTF | THREE.Group> =>
      result.status === "fulfilled"
  );

  const obectList = fulfilledList.map((res) => {
    const object = res.value;
    if (object instanceof THREE.Group) {
      return object;
    } else {
      return object.scene;
    }
  });

  return obectList;
};
