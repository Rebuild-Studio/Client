import postProjectServicesRestApi from '@/network/restApi/services/project/post/postProjectServices';
import { RequestCreateMxProject } from '@/network/webSocket/services/project/post/model/postMxProject.model';
import postProjectServicesWebSocket from '@/network/webSocket/services/project/post/postProjectServices';
import { MxJson } from '@/types/mxJson/mxJson';
import { SceneJson } from '@/types/scene/scene';
import createMxJson from '@/utils/json/createMxJson';
import { ProjectType } from '@store/project.store.ts';

const networkType: string = 'webSocket'; //TODO: networkType을 어떻게 가져올지 고민해보기(localstorage?)
const postProjectServices =
  networkType === 'restApi'
    ? postProjectServicesRestApi
    : postProjectServicesWebSocket;

export const MX_WORKER_REQUEST_TYPE = {
  EXPORT_JSON_FILE: 'exportJsonFile',
  EXPORT_JSON_POST: 'exportJsonPost'
} as const;

export const MX_WORKER_RESPONSE_TYPE = {
  DOWNLOAD: 'download',
  POST_SUCCESS: 'postSuccess',
  POST_FAIL: 'postFail'
} as const;

type ProjectInfo = {
  projectType: ProjectType;
  projectName: string;
  thumbnail: string;
};

export type MxWorkerRequestType =
  (typeof MX_WORKER_REQUEST_TYPE)[keyof typeof MX_WORKER_REQUEST_TYPE];

const CREATE_PROJECT_SERVICE = {
  MX: (reqParam: RequestCreateMxProject) =>
    postProjectServices.createMxProject(reqParam),
  PMX: (reqParam: RequestCreateMxProject) =>
    postProjectServices.createMxProject(reqParam) // 임시로 MX로 대체
};
const requestCreateProject = async (
  projectInfo: ProjectInfo,
  mxJson: MxJson
) => {
  const { projectType, projectName, thumbnail } = projectInfo;
  const reqParam: RequestCreateMxProject = {
    mxName: projectName,
    thumbnail,
    mxJson
  };
  const res = await CREATE_PROJECT_SERVICE[projectType](reqParam);
  postMessage({
    type: MX_WORKER_RESPONSE_TYPE.POST_SUCCESS,
    res
  });
};

self.addEventListener(
  'message',
  async (e: {
    data: {
      type: MxWorkerRequestType;
      sceneJson: SceneJson;
      interactionJson: unknown;
      projectInfo?: ProjectInfo;
    };
  }) => {
    const { type, sceneJson, interactionJson, projectInfo } = e.data;
    switch (type) {
      case MX_WORKER_REQUEST_TYPE.EXPORT_JSON_FILE:
        {
          const mxJson = createMxJson(sceneJson, interactionJson);
          const stringifiedJson = JSON.stringify(mxJson);
          postMessage({
            type: MX_WORKER_RESPONSE_TYPE.DOWNLOAD,
            stringifiedJson
          });
        }
        break;
      case MX_WORKER_REQUEST_TYPE.EXPORT_JSON_POST:
        {
          const mxJson = createMxJson(sceneJson, interactionJson);
          try {
            if (!projectInfo) throw new Error('프로젝트 정보가 없습니다.');
            await requestCreateProject(projectInfo, mxJson);
          } catch (error) {
            postMessage({
              type: MX_WORKER_RESPONSE_TYPE.POST_FAIL,
              error
            });
          }
        }
        break;
      default:
        break;
    }
  }
);
