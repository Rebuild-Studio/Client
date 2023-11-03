import {
  RequestGetAssetList,
  ResponseGetAssetList
} from '@/network/model/library/get/getAssetList.model';
import {
  RequestSearchAsset,
  ResponseSearchAsset
} from '@/network/model/library/get/searchAsset.model';
import apiModule from '@/network/module/apiModule';

const getAssets = async (
  params: RequestGetAssetList
): Promise<ResponseGetAssetList> => {
  const res = await apiModule.get<ResponseGetAssetList>('/library', {
    params: params
  });

  return res.data;
};

const searchAsset = async (params: RequestSearchAsset) => {
  const res = await apiModule.get<ResponseSearchAsset[]>('/library/search', {
    params: params
  });

  return res;
};

const getLibraryServices = {
  getAssets: getAssets,
  searchAsset: searchAsset
};

export default getLibraryServices;
