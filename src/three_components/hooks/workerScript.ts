import { ResponseCreateMxProject } from "@/network/services/project/post/models/postMxProject.model";
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

export type MxWorkerRequestType =
  (typeof MX_WORKER_REQUEST_TYPE)[keyof typeof MX_WORKER_REQUEST_TYPE];

const requestCreateProject = async (type: ProjectType, mxJson: MxJson) => {
  const reqParam = {
    projectName: "test", //TODO 유저가 입력하도록 변경 예정
    thumnail: "test",
    mxJson,
  };
  let res: ResponseCreateMxProject;
  if (type === "MX") {
    res = await postProjectServices.createMxProject(reqParam);
    postMessage({
      type: MX_WORKER_RESPONSE_TYPE.POST_SUCCESS,
      res,
    });
  } else if (type === "PMX") {
    res = await postProjectServices.createPmxProject(reqParam);
    postMessage({
      type: MX_WORKER_RESPONSE_TYPE.POST_SUCCESS,
      res,
    });
  } else {
    throw new Error("잘못된 프로젝트 타입입니다.");
  }
};

self.addEventListener(
  "message",
  async (e: {
    data: {
      type: MxWorkerRequestType;
      sceneJson: SceneJson;
      projectType?: ProjectType;
    };
  }) => {
    const { type, sceneJson, projectType } = e.data;
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
            if (!projectType)
              throw new Error("생성할 프로젝트 타입이 없습니다.");

            await requestCreateProject(projectType, mxJson);
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
