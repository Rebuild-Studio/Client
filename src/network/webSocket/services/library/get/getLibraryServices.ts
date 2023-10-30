import WsModule from '@/network/module/wsModule';
import {
  RequestGetAsset,
  RequestSearchAsset,
  ResponseGetAsset,
  ResponseSearchAsset
} from './models/getLibrary.models';
import { ResponseDto } from '../../model/commonResponse.model';

const socket = WsModule.socket;

const getAssets = async (
  params: RequestGetAsset
): Promise<ResponseGetAsset[]> => {
  const wsModule = new WsModule({
    targetService:
      'service-0.1/com.tmax.mx.controller.FindLibraryByDomainAndCategoriesController'
  });

  const { encodedBody } = await wsModule.encodeBody({ ...params });
  const message = wsModule.assembleMessage(encodedBody);

  wsModule.send(message);

  return new Promise<ResponseGetAsset[]>((resolve, reject) => {
    socket.onmessage = async (event) => {
      const response: ResponseDto<ResponseGetAsset[]> =
        await wsModule.handleServerMessage(event.data);

      if (response) {
        resolve(response.result);
      } else {
        reject(new Error('Request failed'));
      }
    };
  });
};

const searchAsset = async (
  params: RequestSearchAsset
): Promise<ResponseSearchAsset[]> => {
  const wsModule = new WsModule({
    targetService:
      'service-0.1/com.tmax.mx.controller.FindLibraryByNameController'
  });

  const { encodedBody } = await wsModule.encodeBody({ ...params });
  const message = wsModule.assembleMessage(encodedBody);

  wsModule.send(message);

  return new Promise<ResponseSearchAsset[]>((resolve, reject) => {
    socket.onmessage = async (event) => {
      const response: ResponseDto<ResponseSearchAsset[]> =
        await wsModule.handleServerMessage(event.data);

      if (response) {
        resolve(response.result);
      } else {
        reject(new Error('Request failed'));
      }
    };
  });
};

const getLibraryServices = {
  getAssets,
  searchAsset
};

export default getLibraryServices;
