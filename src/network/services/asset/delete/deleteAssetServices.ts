import apiModule from "@network/module/apiModule";
import { RequestDeleteAsset } from "./models/DeleteAssetModels";

const deleteAsset = async () => {
  const res = await apiModule.delete("/asset");

  return res;
};

const deleteSpecificAsset = async (params: RequestDeleteAsset) => {
  const res = await apiModule.delete(`/asset/${params.assetId}`);

  return res;
};

const deleteAssetServices = {
  deleteAsset: deleteAsset,
  deleteSpecificAsset: deleteSpecificAsset
};

export default deleteAssetServices;
