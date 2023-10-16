import postProjectServices from "@/network/services/project/post/postProjectServices";
import { SceneJson } from "@/types/scene/scene";
import createMxJson from "@/utils/json/createMxJson";

export const MX_WORKER_MESSAGE_TYPE = {
  EXPORT_JSON_FILE: "exportJsonFile",
  EXPORT_JSON_POST: "exportJsonPost",
  DOWNLOAD: "download",
  POST_SUCCESS: "postSuccess",
} as const;

export type MxWorkerMessageType =
  (typeof MX_WORKER_MESSAGE_TYPE)[keyof typeof MX_WORKER_MESSAGE_TYPE];

self.addEventListener(
  "message",
  async (e: {
    data: {
      type: MxWorkerMessageType;
      sceneJson: SceneJson;
    };
  }) => {
    switch (e.data.type) {
      case MX_WORKER_MESSAGE_TYPE.EXPORT_JSON_FILE:
        {
          const mxJson = createMxJson(e.data.sceneJson);
          const stringifiedJson = JSON.stringify(mxJson);
          postMessage({
            type: MX_WORKER_MESSAGE_TYPE.DOWNLOAD,
            stringifiedJson,
          });
        }
        break;
      case MX_WORKER_MESSAGE_TYPE.EXPORT_JSON_POST:
        {
          const mxJson = createMxJson(e.data.sceneJson);
          try {
            const reqParam = {
              projectName: "test",
              thumnail: "test",
              mxJson,
            };
            const res = await postProjectServices.createPmxProject(reqParam);
            postMessage({
              type: MX_WORKER_MESSAGE_TYPE.POST_SUCCESS,
              res,
            });
          } catch (e) {
            console.error("PMX 생성 실패 : ", e);
          }
        }
        break;
      default:
        break;
    }
  }
);
