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
import getMinioPath from "@/utils/path/minio";

// 서버에서 glb, gltf 로더
export const useServerGLTFLoader = (url: string): GLTF & ObjectMap => {
  const gl = useThree((state) => state.gl);

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
export const useServerTextureLoader = (input: string): THREE.Texture => {
  return useLoader(THREE.TextureLoader, input);
};

// 서버에서 머테리얼 오브젝트 로드하여 머테리얼 반환
export const useServerMaterialLoader = (name: string): THREE.Material => {
  const object = useServerGLTFLoader(getMinioPath(name, "libraryMaterial"));

  const materials = object.materials;
  return materials[Object.keys(materials)[0] ?? 0];
};

//////////////////////////////////// minio 서버가 아닌 load

// 로컬 파일 로더
export const useFileListLoader = (
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

export const useFileLoader = (file: File): (GLTF & ObjectMap) | THREE.Group => {
  // loadingManger
  const manager = new THREE.LoadingManager();
  const objectURLList: string[] = [];

  const filesMap = {
    [file.name]: file,
  };

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

  const extension = file.name.split(".").pop()?.toLocaleLowerCase();
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
      break;
  }

  URL.revokeObjectURL(file.name);

  return useLoader(LoaderClass, file.name, loaderCallback);
};
