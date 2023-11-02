import sasApiHandler from '@/network/webSocket/utils/sasApiHandler';
import {
  RequestGetAsset,
  RequestSearchAsset,
  ResponseGetAsset,
  ResponseSearchAsset
} from './models/getLibrary.models';

const getAssets = async (params: RequestGetAsset) => {
  return sasApiHandler<RequestGetAsset, ResponseGetAsset[]>(
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
