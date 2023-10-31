import WsModule from '@/network/module/wsModule';
import {
  RequestDeleteMxProject,
  ResponseDeleteMxProject
} from './model/deleteProject.model';

const deleteMxProjectList = async ({ mxId }: RequestDeleteMxProject) => {
  const wsModule = new WsModule({
    targetService: 'DeleteMxController'
  });
  const { encodedBody } = await wsModule.encodeBody({ mxId });
  const message = wsModule.assembleMessage(encodedBody);

  wsModule.send(message);

  return await wsModule.onReceiveMessage<ResponseDeleteMxProject>();
};

const deleteProjectServices = {
  deleteMxProjectList
};

export default deleteProjectServices;
