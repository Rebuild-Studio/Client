import apiModule from "@/network/module/apiModule";
import { RequestUploadAsset } from "./models/PostAssetModels";

const uploadAsset = async (params: RequestUploadAsset) => {
  const formData = new FormData();
  formData.append("asset", params.file, `${params.fileName}_test.glb`);

  const res = await apiModule.post("/asset", formData);

  return res;
};

const postAssetServices = {
  uploadAsset: uploadAsset,
};

export default postAssetServices;
