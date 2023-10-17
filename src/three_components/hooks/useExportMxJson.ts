import { SceneControlStore } from "@/store/sceneControlStore";
import downloadFile from "@/utils/file/downloadFile";
import { Dispatch, useEffect, useState } from "react";
import MxWorker from "./workerScript?worker";
import {
  MX_WORKER_REQUEST_TYPE,
  MX_WORKER_RESPONSE_TYPE,
} from "./workerScript";
import { ProjectType } from "@/store/projectStore";

const exportJsonFile = async (
  scene: THREE.Scene,
  setIsProcessing: Dispatch<React.SetStateAction<boolean>>,
  setIsSuccess: Dispatch<React.SetStateAction<boolean>>
) => {
  const mxWorker = new MxWorker();
  // TODO : toJSON이 사용하는 속성들만을 추출하는 함수를 만들어서 사용하도록 해야함.
  const sceneJson = scene.toJSON();
  mxWorker.postMessage({
    type: MX_WORKER_REQUEST_TYPE.EXPORT_JSON_FILE,
    sceneJson,
  });
  mxWorker.onmessage = (e) => {
    if (e.data.type === MX_WORKER_RESPONSE_TYPE.DOWNLOAD) {
      const { stringifiedJson } = e.data;
      downloadFile(stringifiedJson, "mxJson.json", "json");

      setIsProcessing(false);
      setIsSuccess(true);
    } else {
      console.error("잘못된 요청 타입입니다: ", e.data.type);
    }
    mxWorker.terminate();
  };
};

const exportJsonPost = async (
  scene: THREE.Scene,
  createProjectType: ProjectType,
  setIsProcessing: Dispatch<React.SetStateAction<boolean>>,
  setIsSuccess: Dispatch<React.SetStateAction<boolean>>
) => {
  const mxWorker = new MxWorker();
  // TODO : toJSON이 사용하는 속성들만을 추출하는 함수를 만들어서 사용하도록 해야함.
  const sceneJson = scene.toJSON();
  mxWorker.postMessage({
    type: MX_WORKER_REQUEST_TYPE.EXPORT_JSON_POST,
    sceneJson,
    projectType: createProjectType,
  });
  mxWorker.onmessage = (e) => {
    setIsProcessing(false);
    if (e.data.type === MX_WORKER_RESPONSE_TYPE.POST_SUCCESS) {
      const { res } = e.data;
      res && console.info("PMX 생성 성공 : ", res);

      setIsSuccess(true);
    } else {
      console.error(e.data.error);
      setIsSuccess(false);
    }
    mxWorker.terminate();
  };
};
interface Props {
  scene: THREE.Scene;
  sceneControlStore: SceneControlStore;
}
const useExportMxJson = ({ scene, sceneControlStore }: Props) => {
  const { file: fileTrigger, post: postTrigger } =
    sceneControlStore.exportMxJsonTrigger;
  const { createProjectType } = sceneControlStore;

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // 트리거 둘다 false 일때 return
    if (!fileTrigger && !postTrigger) return;
    setIsSuccess(false);
    setIsProcessing(true);

    // 파일 내보내기 트리거 발동 시
    fileTrigger && exportJsonFile(scene, setIsProcessing, setIsSuccess);
    // 프로젝트 저장(POST) 트리거 발동 시
    postTrigger &&
      exportJsonPost(scene, createProjectType, setIsProcessing, setIsSuccess);

    sceneControlStore.initExportMxJsonTrigger();
  }, [fileTrigger, postTrigger, createProjectType, scene, sceneControlStore]);

  useEffect(() => {
    isSuccess && setIsSuccess(false);
  }, [isSuccess]);

  return [isSuccess, isProcessing];
};

export default useExportMxJson;
