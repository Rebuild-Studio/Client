import WsModule from '@/network/module/wsModule';
import {
  RequestGetMxProject,
  ResponseGetMxProject
} from './model/getMxProject.model';
import { ResponseGetMxProjectList } from './model/getMxProjectList.model';
import {
  RequestGetPmxProject,
  ResponseGetPmxProject
} from './model/getPmxProject.model';
import { ResponseGetPmxProjectList } from './model/getPmxProjectList.model';

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

const getAllPmxProjectList = async () => {
  const wsModule = new WsModule({
    targetService: 'FindAllPmxController'
  });
  const message = wsModule.assembleMessage();
  wsModule.sendInChunks(message);

  return wsModule.onReceiveMessage<ResponseGetPmxProjectList>();
};

const getMyPmxProjectList = async () => {
  const wsModule = new WsModule({
    targetService: 'FindMyPmxController'
  });
  const message = wsModule.assembleMessage();
  wsModule.sendInChunks(message);

  return wsModule.onReceiveMessage<ResponseGetPmxProjectList>();
};

const getPmxProject = async (params: RequestGetPmxProject) => {
  const wsModule = new WsModule({
    targetService: 'ReadPmxController'
  });
  const { encodedBody } = await wsModule.encodeBody({ ...params });
  const message = wsModule.assembleMessage(encodedBody);
  wsModule.send(message);

  return wsModule.onReceiveMessage<ResponseGetPmxProject>();
};

const getProjectServices = {
  getMyMxProjectList,
  getMxProject,
  getAllPmxProjectList,
  getMyPmxProjectList,
  getPmxProject
};

export default getProjectServices;
