import WsModule from '@/network/module/wsModule';
import { MxJson } from '@/types/mxJson/mxJson';
import {
  RequestCreateMxProject,
  ResponseCreateMxProject
} from './model/postMxProject.model';

type Variables = {
  mxName: string;
  mxJson: MxJson;
  thumbnail: string;
};

async function createVariableParts({ mxName, mxJson, thumbnail }: Variables) {
  const thumbnailBuffer = Buffer.from(thumbnail);
  // thumbnail mock
  // const thumbnailBuffer = Buffer.from(
  //   await fetch('mock/thumbnail.png').then((res) => res.arrayBuffer())
  // );
  const sceneBuffer = Buffer.from(JSON.stringify(mxJson));

  //body
  const varBody = JSON.stringify({
    mxName: mxName,
    fileMetaData: {
      thumbnailFileLength: thumbnailBuffer.byteLength,
      sceneJsonLength: sceneBuffer.byteLength
    }
  });

  const varByteArray = new Uint8Array(
    thumbnailBuffer.byteLength + sceneBuffer.byteLength
  );
  varByteArray.set(thumbnailBuffer);
  varByteArray.set(sceneBuffer, thumbnailBuffer.byteLength);

  return {
    encodedBody: new TextEncoder().encode(varBody),
    byteArray: varByteArray
  };
}
const createMxProject = async (params: RequestCreateMxProject) => {
  const wsModule = new WsModule({
    targetService: 'CreateMxController'
  });
  const { encodedBody, byteArray } = await createVariableParts(params);
  const message = wsModule.assembleMessage(encodedBody, byteArray);
  wsModule.sendInChunks(message);

  return wsModule.onReceiveMessage<ResponseCreateMxProject>();
};

const createPmxProject = async (params: RequestCreateMxProject) => {
  const wsModule = new WsModule({
    targetService: 'CreatePmxController'
  });
  const { encodedBody, byteArray } = await createVariableParts(params);
  const message = wsModule.assembleMessage(encodedBody, byteArray);
  wsModule.sendInChunks(message);

  return wsModule.onReceiveMessage<ResponseCreateMxProject>();
};

const postProjectServices = {
  createMxProject,
  createPmxProject
};

export default postProjectServices;
