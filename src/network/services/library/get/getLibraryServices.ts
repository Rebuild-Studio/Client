import apiModule from "@network/module/apiModule";
import {
  RequestGetAsset,
  RequestSearchAsset,
  ResponseGetAsset,
} from "./models/GetLibraryModels";

const getAssets = async (
  params: RequestGetAsset,
): Promise<ResponseGetAsset[]> => {
  const res = await apiModule.get<ResponseGetAsset[]>("/library", {
    params: params,
  });

  return res.data;
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
