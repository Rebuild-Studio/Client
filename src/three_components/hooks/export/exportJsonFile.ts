import { Dispatch } from 'react';
import storeContainer from '@/store/storeContainer';
import { InteractionJson } from '@/types/interaction/interaction';
import downloadFile from '@/utils/file/downloadFile';
import createSceneJson from '@/utils/json/createSceneJson';
import { closeFullScreenLoading } from '@/utils/loading/loadingHandler';
import {
  JSON_WORKER_REQUEST_TYPE,
  JSON_WORKER_RESPONSE_TYPE,
  JsonWorkerRequestType
} from '../jsonWorker';
import JsonWorker from '../jsonWorker?worker';

type ExportJsonFile = (
  requestType: JsonWorkerRequestType,
  setIsProcessing: Dispatch<React.SetStateAction<boolean>>,
  setIsSuccess: Dispatch<React.SetStateAction<boolean>>,
  scene?: THREE.Scene,
  interactionJson?: InteractionJson
) => Promise<void>;

const exportJsonFile: ExportJsonFile = async (
  requestType,
  setIsProcessing,
  setIsSuccess,
  scene,
  interactionJson
) => {
  const jsonWorker = new JsonWorker();
  // TODO : toJSON이 사용하는 속성들만을 추출하는 함수를 만들어서 사용하도록 해야함.
  const { projectStore } = storeContainer;

  switch (requestType) {
    case JSON_WORKER_REQUEST_TYPE.CREATE_MX_JSON:
      {
        const sceneJson = scene ? createSceneJson(scene) : {};
        if (!sceneJson || !interactionJson) return;
        jsonWorker.postMessage({
          type: requestType,
          sceneJson,
          interactionJson
        });
      }
      break;
    case JSON_WORKER_REQUEST_TYPE.CREATE_SCENE_JSON:
      {
        // 씬 json 생성시엔 optimization 안함
        const sceneJson = scene ? createSceneJson(scene, false) : {};
        if (!sceneJson) return;
        jsonWorker.postMessage({
          type: requestType,
          sceneJson
        });
      }
      break;
    case JSON_WORKER_REQUEST_TYPE.CREATE_INTERACTION_JSON:
      if (!interactionJson) return;
      jsonWorker.postMessage({
        type: requestType,
        interactionJson
      });
      break;
    default:
      break;
  }

  jsonWorker.onmessage = (e) => {
    if (e.data.type === JSON_WORKER_RESPONSE_TYPE.DOWNLOAD) {
      const { stringifiedJson } = e.data;
      downloadFile(stringifiedJson, projectStore.projectName + '.json', 'json');

      setIsProcessing(false);
      setIsSuccess(true);
    } else {
      console.error('잘못된 요청 타입입니다: ', e.data.type);
    }
    closeFullScreenLoading();
    jsonWorker.terminate();
  };
};

export default exportJsonFile;
