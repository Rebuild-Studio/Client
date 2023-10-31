import WsModule from '@/network/module/wsModule';
import {
  RequestGetAsset,
  RequestSearchAsset,
  ResponseGetAsset,
  ResponseSearchAsset
} from './models/getLibrary.models';

const getAssets = async (
  params: RequestGetAsset
): Promise<ResponseGetAsset[]> => {
  const wsModule = new WsModule({
    targetService: 'FindLibraryByDomainAndCategoriesController'
  });

  const { encodedBody } = await wsModule.encodeBody({ ...params });
  const message = wsModule.assembleMessage(encodedBody);

  wsModule.send(message);

  return await wsModule.onReceiveMessage<ResponseGetAsset[]>();
};

const searchAsset = async (
  params: RequestSearchAsset
): Promise<ResponseSearchAsset[]> => {
  const wsModule = new WsModule({
    targetService: 'FindLibraryByNameController'
  });

  const { encodedBody } = await wsModule.encodeBody({ ...params });
  const message = wsModule.assembleMessage(encodedBody);

  wsModule.send(message);

  return await wsModule.onReceiveMessage<ResponseSearchAsset[]>();
};

const getLibraryServices = {
  getAssets,
  searchAsset
};

export default getLibraryServices;
