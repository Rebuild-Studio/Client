import downloadFile from "@/utils/file/downloadFile";
import { Dispatch, useCallback, useEffect, useState } from "react";
import MxWorker from "./workerScript?worker";
import { ProjectStore, ProjectType } from "@/store/projectStore";
import {
  MX_WORKER_REQUEST_TYPE,
  MX_WORKER_RESPONSE_TYPE,
} from "./workerScript";
import EventSystemStore from "@/interaction(legacyJS)/src/Components/stores/EventSystem_Store";
import { toJS } from "mobx";

const exportJsonFile = async (
  scene: THREE.Scene,
  interactionJson: any,
  setIsProcessing: Dispatch<React.SetStateAction<boolean>>,
  setIsSuccess: Dispatch<React.SetStateAction<boolean>>
) => {
  const mxWorker = new MxWorker();
  interactionJson = toJS(interactionJson);
  // TODO : toJSON이 사용하는 속성들만을 추출하는 함수를 만들어서 사용하도록 해야함.
  const sceneJson = scene.toJSON();
  mxWorker.postMessage({
    type: MX_WORKER_REQUEST_TYPE.EXPORT_JSON_FILE,
    sceneJson,
    interactionJson,
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
  projectType: ProjectType,
  projectStore: ProjectStore,
  interactionJson: any,
  setIsProcessing: Dispatch<React.SetStateAction<boolean>>,
  setIsSuccess: Dispatch<React.SetStateAction<boolean>>
) => {
  const { projectName, thumbnail } = projectStore;
  const mxWorker = new MxWorker();
  // TODO : toJSON이 사용하는 속성들만을 추출하는 함수를 만들어서 사용하도록 해야함.
  const sceneJson = scene.toJSON();

  const projectInfo = {
    projectType,
    projectName,
    thumbnail,
  };
  mxWorker.postMessage({
    type: MX_WORKER_REQUEST_TYPE.EXPORT_JSON_POST,
    sceneJson,
    interactionJson,
    projectInfo,
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
  projectStore: ProjectStore;
  interactionStore: EventSystemStore;
}

type hookReturnType = [
  isSuccess: boolean,
  isProcessing: boolean,
  createProject: (projectType: ProjectType) => void,
  downloadProject: () => void,
];

const useExportMxJson = ({
  projectStore,
  interactionStore,
}: Props): hookReturnType => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    projectStore.initAfterExport();
  }, [isProcessing, projectStore]);

  // 프로젝트 저장 함수("MX" | "PMX")
  const createProject = useCallback(
    (projectType: ProjectType) => {
      if (!projectStore.scene) return;
      setIsProcessing(true);
      setIsSuccess(false);
      const interactionJson = JSON.parse(
        JSON.stringify(interactionStore.toJSON())
      );

      exportJsonPost(
        projectStore.scene,
        projectType,
        projectStore,
        interactionJson,
        setIsProcessing,
        setIsSuccess
      );
    },
    [interactionStore, projectStore]
  );

  //다운로드 함수
  const downloadProject = useCallback(() => {
    if (!projectStore.scene) return;
    setIsProcessing(true);
    setIsSuccess(false);
    const interactionJson = interactionStore.toJSON();

    exportJsonFile(
      projectStore.scene,
      interactionJson,
      setIsProcessing,
      setIsSuccess
    );
  }, [projectStore.scene, interactionStore]);

  return [isSuccess, isProcessing, createProject, downloadProject];
};

export default useExportMxJson;
