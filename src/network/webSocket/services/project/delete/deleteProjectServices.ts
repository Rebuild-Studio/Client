import WsModule from '@/network/module/wsModule';
import {
  RequestDeleteMxProject,
  ResponseDeleteMxProject
} from './model/deleteMxProject.model';

const deleteMxProject = async (params: RequestDeleteMxProject) => {
  const wsModule = new WsModule({
    targetService: 'DeleteMxController'
  });
  const { encodedBody } = await wsModule.encodeBody({ ...params });
  const message = wsModule.assembleMessage(encodedBody);

  wsModule.send(message);

  return await wsModule.onReceiveMessage<ResponseDeleteMxProject>();
};

const deletePmxProject = async (params: RequestDeleteMxProject) => {
  const wsModule = new WsModule({
    targetService: 'DeletePmxController'
  });
  const { encodedBody } = await wsModule.encodeBody({ ...params });
  const message = wsModule.assembleMessage(encodedBody);

  wsModule.send(message);

  return await wsModule.onReceiveMessage<ResponseDeleteMxProject>();
};

const deleteProjectServices = {
  deleteMxProject,
  deletePmxProject
};

export default deleteProjectServices;
