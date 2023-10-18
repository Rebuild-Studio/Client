import { RequestCreateMxProject } from "@/network/services/project/post/models/postMxProject.model";
import postProjectServices from "@/network/services/project/post/postProjectServices";
import { ProjectType } from "@/store/projectStore";
import { MxJson } from "@/types/mxJson/mxJson";
import { SceneJson } from "@/types/scene/scene";
import createMxJson from "@/utils/json/createMxJson";

export const MX_WORKER_REQUEST_TYPE = {
  EXPORT_JSON_FILE: "exportJsonFile",
  EXPORT_JSON_POST: "exportJsonPost",
} as const;

export const MX_WORKER_RESPONSE_TYPE = {
  DOWNLOAD: "download",
  POST_SUCCESS: "postSuccess",
  POST_FAIL: "postFail",
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
    postProjectServices.createPmxProject(reqParam),
};
const requestCreateProject = async (
  projectInfo: ProjectInfo,
  mxJson: MxJson
) => {
  const { projectType, projectName, thumbnail } = projectInfo;
  const reqParam: RequestCreateMxProject = {
    projectName, //TODO 유저가 입력하도록 변경 예정
    thumbnail,
    mxJson,
  };
  const res = await CREATE_PROJECT_SERVICE[projectType](reqParam);
  postMessage({
    type: MX_WORKER_RESPONSE_TYPE.POST_SUCCESS,
    res,
  });
};

self.addEventListener(
  "message",
  async (e: {
    data: {
      type: MxWorkerRequestType;
      sceneJson: SceneJson;
      projectInfo?: ProjectInfo;
    };
  }) => {
    const { type, sceneJson, projectInfo } = e.data;
    switch (type) {
      case MX_WORKER_REQUEST_TYPE.EXPORT_JSON_FILE:
        {
          const mxJson = createMxJson(sceneJson);
          const stringifiedJson = JSON.stringify(mxJson);
          postMessage({
            type: MX_WORKER_RESPONSE_TYPE.DOWNLOAD,
            stringifiedJson,
          });
        }
        break;
      case MX_WORKER_REQUEST_TYPE.EXPORT_JSON_POST:
        {
          const mxJson = createMxJson(sceneJson);
          try {
            if (!projectInfo) throw new Error("프로젝트 정보가 없습니다.");
            await requestCreateProject(projectInfo, mxJson);
          } catch (error) {
            postMessage({
              type: MX_WORKER_RESPONSE_TYPE.POST_FAIL,
              error,
            });
          }
        }
        break;
      default:
        break;
    }
  }
);
