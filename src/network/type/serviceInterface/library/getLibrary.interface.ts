import {
  RequestGetAssetList,
  ResponseGetAssetList
} from '@/network/model/library/get/getAssetList.model';
import {
  RequestSearchAsset,
  ResponseSearchAsset
} from '@/network/model/library/get/searchAsset.model';

interface GetLibraryServices {
  getAssets: (params: RequestGetAssetList) => Promise<ResponseGetAssetList>;
  searchAsset: (params: RequestSearchAsset) => Promise<ResponseSearchAsset[]>;
}

export default GetLibraryServices;
