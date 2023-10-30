import WsModule from '@/network/module/wsModule';
import { MxJson } from '@/types/mxJson/mxJson';
import {
  RequestCreateMxProject,
  ResponseCreateMxProject
} from './model/postMxProject.model';
import { ResponseDto } from '../../model/commonResponse.model';

const socket = WsModule.socket;

async function createVariableParts(mxJson: MxJson, thumbnail: ArrayBuffer) {
  const thumbnailBuffer = Buffer.from(thumbnail);
  // thumbnail mock
  // const thumbnailBuffer = Buffer.from(
  //   await fetch('mock/thumbnail.png').then((res) => res.arrayBuffer())
  // );
  const sceneBuffer = Buffer.from(JSON.stringify(mxJson));

  //body
  const varBody = JSON.stringify({
    taskName: 'value',
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
const createMxProject = async ({
  mxJson,
  thumbnail
}: RequestCreateMxProject) => {
  const wsModule = new WsModule({
    targetService: 'service-0.1/com.tmax.mx.controller.CreateMxController'
  });
  const { encodedBody, byteArray } = await createVariableParts(
    mxJson,
    thumbnail
  );
  const message = wsModule.assembleMessage(encodedBody, byteArray);
  wsModule.sendInChunks(message);

  return new Promise<ResponseCreateMxProject>((resolve, reject) => {
    socket.onmessage = async (event) => {
      const response: ResponseDto<ResponseCreateMxProject> =
        await wsModule.handleServerMessage(event.data);

      if (response) {
        resolve(response.result);
      } else {
        reject(new Error('Request failed'));
      }
    };
  });
};

export { createMxProject };
