import WsModule from '@/network/module/wsModule';
import {
  RequestGetMxProject,
  ResponseGetMxProject
} from './model/getMxProject.model';
import { ResponseGetMxProjectList } from './model/getMxProjectList.model';

const getMyMxProjectList = async () => {
  const wsModule = new WsModule({
    targetService: 'FindMyMxController'
  });
  const message = wsModule.assembleMessage();
  wsModule.sendInChunks(message);

  return wsModule.onReceiveMessage<ResponseGetMxProjectList>();
};

const getMxProject = async (params: RequestGetMxProject) => {
  const wsModule = new WsModule({
    targetService: 'ReadMxController'
  });
  const { encodedBody } = await wsModule.encodeBody({ ...params });
  const message = wsModule.assembleMessage(encodedBody);
  wsModule.send(message);

  return wsModule.onReceiveMessage<ResponseGetMxProject>();
};

const getProjectServices = {
  getMyMxProjectList,
  getMxProject
};

export default getProjectServices;
