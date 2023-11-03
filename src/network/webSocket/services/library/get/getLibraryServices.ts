import {
  RequestGetAssetList,
  ResponseGetAssetList
} from '@/network/model/library/get/getAssetList.model';
import {
  RequestSearchAsset,
  ResponseSearchAsset
} from '@/network/model/library/get/searchAsset.model';
import sasApiHandler from '@/network/webSocket/utils/sasApiHandler';

const getAssets = async (params: RequestGetAssetList) => {
  return sasApiHandler<RequestGetAssetList, ResponseGetAssetList>(
    'FindLibraryByDomainAndCategoriesController',
    params
  );
};

const searchAsset = async (params: RequestSearchAsset) => {
  return sasApiHandler<RequestSearchAsset, ResponseSearchAsset[]>(
    'FindLibraryByNameController',
    params
  );
};

const getLibraryServices = {
  getAssets,
  searchAsset
};

export default getLibraryServices;
