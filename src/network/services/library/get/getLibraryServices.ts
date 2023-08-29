import apiModule from "@/network/module/apiModule";
import { RequestGetAsset, RequestSearchAsset } from "./models/GetLibraryModels";

const getAssets = async (params: RequestGetAsset) => {
  const res = await apiModule.get("/library", {
    params: params,
  });

  return res;
};

const searchAsset = async (params: RequestSearchAsset) => {
  const res = await apiModule.get("/libray/search", {
    params: params,
  });

  return res;
};

const getLibraryServices = {
  getAssets: getAssets,
  searchAsset: searchAsset,
};

export default getLibraryServices;
