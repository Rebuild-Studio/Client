import WsModule from '@/network/module/wsModule';
import {
  RequestDeleteMxProject,
  ResponseDeleteMxProject
} from './model/deleteProject.model';
import { ResponseDto } from '../../model/commonResponse.model';

const socket = WsModule.socket;

const deleteMxProjectList = async ({ mxId }: RequestDeleteMxProject) => {
  const wsModule = new WsModule({
    targetService: 'service-0.1/com.tmax.mx.controller.DeleteMxController'
  });
  const { encodedBody } = await wsModule.encodeBody({ mxId });
  const message = wsModule.assembleMessage(encodedBody);

  wsModule.send(message);

  return new Promise<ResponseDeleteMxProject>((resolve, reject) => {
    socket.onmessage = async (event) => {
      const response: ResponseDto<ResponseDeleteMxProject> =
        await wsModule.handleServerMessage(event.data);

      if (response) {
        resolve(response.result);
      } else {
        reject(new Error('Request failed'));
      }
    };
  });
};

const deleteProjectServices = {
  deleteMxProjectList
};

export default deleteProjectServices;
