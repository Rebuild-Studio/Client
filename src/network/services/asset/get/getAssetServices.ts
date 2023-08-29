import apiModule from "@/network/module/apiModule";

const getAsset = async () => {
  const res = await apiModule.get("/asset");

  return res;
};

const getPublicAsset = async () => {
  const res = await apiModule.get("/asset/public");

  return res;
};

const getAssetServices = {
  getAsset: getAsset,
  getPublicAsset: getPublicAsset,
};

export default getAssetServices;
