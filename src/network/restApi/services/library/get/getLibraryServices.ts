import { CommonResponse } from '@/network/model/common/response.model';
import {
  RequestGetAssetList,
  ResponseGetAssetList
} from '@/network/model/library/get/getAssetList.model';
import {
  RequestSearchAsset,
  ResponseSearchAsset
} from '@/network/model/library/get/searchAsset.model';
import apiModule from '@/network/module/apiModule';
import GetLibraryServices from '@/network/type/serviceInterface/library/getLibrary.interface';

const getAssets = async (params: RequestGetAssetList) => {
  const res = await apiModule.get<CommonResponse<ResponseGetAssetList>>(
    '/library',
    {
      params: params
    }
  );

  return res.data.result;
};

const searchAsset = async (params: RequestSearchAsset) => {
  const res = await apiModule.get<CommonResponse<ResponseSearchAsset[]>>(
    '/library/search',
    {
      params: params
    }
  );

  return res.data.result;
};

const getLibraryServices: GetLibraryServices = {
  getAssets,
  searchAsset
};

export default getLibraryServices;
