import * as THREE from "three";
import {
  LoaderProto,
  ObjectMap,
  useLoader,
  useThree,
} from "@react-three/fiber";
import { GLTFLoader, GLTF } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { KTX2Loader } from "three/addons/loaders/KTX2Loader.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";

// TODO : 주소 따로 관리 필요
const MINIO_URL = "https://dev.mxstudio.app/storage/";
const MATERIAL_DIR = "models/MaterialTemplates/";

// 서버에서 glb, gltf 로더
export const useServerGLTFLoader = <T extends string | string[]>(
  input: T,
  dir: string
): T extends any[] ? (GLTF & ObjectMap)[] : GLTF & ObjectMap => {
  const gl = useThree((state) => state.gl);

  const url = Array.isArray(input)
    ? input.map((value) => MINIO_URL + dir + value)
    : MINIO_URL + dir + input;
  return useLoader(GLTFLoader, url, (loader: GLTFLoader) => {
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

// 서버에서 텍스쳐 로더
export const useServerTextureLoader = <T extends string | string[]>(
  input: T,
  dir: string
): T extends any[] ? THREE.Texture[] : THREE.Texture => {
  const url = Array.isArray(input)
    ? input.map((value) => MINIO_URL + dir + value)
    : MINIO_URL + dir + input;
  return useLoader(THREE.TextureLoader, url);
};

// 서버에서 머테리얼 오브젝트 로드하여 머테리얼 반환
export const useServerMaterialLoader = (name: string): THREE.Material => {
  const [object] = useServerGLTFLoader([`${name}.glb`], MATERIAL_DIR);

  const materials = object.materials;
  return materials[Object.keys(materials)[0] ?? 0];
};

//////////////////////////////////// minio 서버가 아닌 load

// 로컬 파일 로더
export const useFileLoader = (
  fileList: FileList
): ((GLTF & ObjectMap) | THREE.Group)[] => {
  // 파일 array, map, name array
  const files = Array.from(fileList);
  const filesMap = files.reduce<Record<string, File>>((acc, file) => {
    acc[file.name] = file;
    return acc;
  }, {});
  const fileNameList = files.map((file) => file.name);

  // loadingManger
  const manager = new THREE.LoadingManager();
  const objectURLList: string[] = [];
  manager.setURLModifier((url) => {
    url = url.replace(/^(\.?\/)/, ""); // remove './'

    const file = filesMap[url];

    if (file) {
      const objURL = URL.createObjectURL(filesMap[url]);
      objectURLList.push(objURL);
      return objURL;
    }

    return url;
  });

  let result: ((GLTF & ObjectMap) | THREE.Group)[] = [];

  for (const fileName of fileNameList) {
    const extension = fileName.split(".").pop()?.toLocaleLowerCase();
    let LoaderClass: LoaderProto<any> = GLTFLoader;
    let loaderCallback: (loader?: any) => void = () => {};

    switch (extension) {
      case "glb":
      case "gltf":
        LoaderClass = GLTFLoader;
        loaderCallback = (loader: GLTFLoader) => {
          //set Draco decoder for loading
          const dracoLoader = new DRACOLoader();
          dracoLoader.setDecoderPath("/gltf/draco/");
          loader.setDRACOLoader(dracoLoader);

          loader.manager = manager;
        };
        break;
      case "obj":
        LoaderClass = OBJLoader;
        loaderCallback = (loader: OBJLoader) => {
          loader.manager = manager;
        };
        break;
      default:
        console.warn("불가능한 확장자 : ", fileName);
        continue;
    }

    result = [...result, useLoader(LoaderClass, fileName, loaderCallback)];
  }

  // url revoke
  objectURLList.forEach((objURL) => {
    URL.revokeObjectURL(objURL);
  });

  return result;
};
