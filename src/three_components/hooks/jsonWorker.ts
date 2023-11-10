import { InteractionJson } from '@/types/interaction/interaction';
import { SceneJson } from '@/types/scene/scene';
import createMxJson from '@/utils/json/createMxJson';
import { ProjectType } from '@store/project.store.ts';

export const JSON_WORKER_REQUEST_TYPE = {
  CREATE_MX_JSON: 'createMxJson',
  CREATE_SCENE_JSON: 'createSceneJson',
  CREATE_INTERACTION_JSON: 'createInteractionJson'
} as const;

export const JSON_WORKER_RESPONSE_TYPE = {
  DOWNLOAD: 'download',
  ERROR: 'error'
} as const;

type ProjectInfo = {
  projectType: ProjectType;
  projectName: string;
  thumbnail: string;
};

export type JsonWorkerRequestType =
  (typeof JSON_WORKER_REQUEST_TYPE)[keyof typeof JSON_WORKER_REQUEST_TYPE];

self.addEventListener(
  'message',
  async (e: {
    data: {
      type: JsonWorkerRequestType;
      sceneJson?: SceneJson;
      interactionJson?: InteractionJson;
      projectInfo?: ProjectInfo;
    };
  }) => {
    const { type, sceneJson, interactionJson } = e.data;
    let errorMessage = '';
    switch (type) {
      case JSON_WORKER_REQUEST_TYPE.CREATE_MX_JSON:
        {
          if (!sceneJson || !interactionJson) {
            if (!sceneJson) errorMessage = 'sceneJson이 없습니다.';
            if (!interactionJson) errorMessage = 'interactionJson이 없습니다.';
            return;
          }
          const mxJson = createMxJson(sceneJson, interactionJson);
          const stringifiedJson = JSON.stringify(mxJson);
          postMessage({
            type: JSON_WORKER_RESPONSE_TYPE.DOWNLOAD,
            stringifiedJson
          });
        }
        break;
      case JSON_WORKER_REQUEST_TYPE.CREATE_SCENE_JSON:
        {
          if (!sceneJson) {
            errorMessage = 'sceneJson이 없습니다.';
            return;
          }
          const stringifiedJson = JSON.stringify(sceneJson);
          postMessage({
            type: JSON_WORKER_RESPONSE_TYPE.DOWNLOAD,
            stringifiedJson
          });
        }
        break;
      case JSON_WORKER_REQUEST_TYPE.CREATE_INTERACTION_JSON:
        {
          if (!interactionJson) {
            errorMessage = 'interactionJson이 없습니다.';
            return;
          }
          const stringifiedJson = JSON.stringify(interactionJson);
          postMessage({
            type: JSON_WORKER_RESPONSE_TYPE.DOWNLOAD,
            stringifiedJson
          });
        }
        break;
      default:
        break;
    }
    if (type) {
      postMessage({
        type: JSON_WORKER_RESPONSE_TYPE.ERROR,
        message: errorMessage ?? '잘못된 요청 타입입니다.'
      });
    }
  }
);
