import apiModule from "@network/module/apiModule";
import {
  RequestRegisterAsset,
  RequestRegisterPrefab
} from "./models/PostLibraryModels";

const registerPrefab = async (params: RequestRegisterPrefab) => {
  const res = await apiModule.post("/library/prefab", params);

  return res;
};

const registerAsset = async (params: RequestRegisterAsset) => {
  const res = await apiModule.post("/library/asset", params);

  return res;
};

const postLibraryServices = {
  registerPrefab: registerPrefab,
  registerAsset: registerAsset
};

export default postLibraryServices;
