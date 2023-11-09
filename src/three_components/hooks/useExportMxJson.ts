import { Dispatch, useCallback, useEffect, useState } from 'react';
import EventSystemStore from '@/interaction(legacyJS)/src/Components/stores/EventSystem_Store';
import storeContainer from '@/store/storeContainer';
import { restoreCameraTransformation } from '@/three_components/utils/restoreCameraTransformation.ts';
import downloadFile from '@/utils/file/downloadFile';
import createInteractionJson from '@/utils/json/createInteractionJson';
import createSceneJson from '@/utils/json/createSceneJson';
import { closeFullScreenLoading } from '@/utils/loading/loadingHandler';
import { ProjectStore, ProjectType } from '@store/project.store.ts';
import {
  MX_WORKER_REQUEST_TYPE,
  MX_WORKER_RESPONSE_TYPE
} from './workerScript';
import MxWorker from './workerScript?worker';

const exportJsonFile = async (
  scene: THREE.Scene,
  interactionJson: unknown,
  setIsProcessing: Dispatch<React.SetStateAction<boolean>>,
  setIsSuccess: Dispatch<React.SetStateAction<boolean>>
) => {
  const mxWorker = new MxWorker();
  // TODO : toJSON이 사용하는 속성들만을 추출하는 함수를 만들어서 사용하도록 해야함.
  const sceneJson = createSceneJson(scene);
  const { projectStore } = storeContainer;

  mxWorker.postMessage({
    type: MX_WORKER_REQUEST_TYPE.EXPORT_JSON_FILE,
    sceneJson,
    interactionJson
  });
  mxWorker.onmessage = (e) => {
    if (e.data.type === MX_WORKER_RESPONSE_TYPE.DOWNLOAD) {
      const { stringifiedJson } = e.data;
      downloadFile(stringifiedJson, projectStore.projectName + '.json', 'json');

      setIsProcessing(false);
      setIsSuccess(true);
    } else {
      console.error('잘못된 요청 타입입니다: ', e.data.type);
    }
    closeFullScreenLoading();
    mxWorker.terminate();
  };
};

const exportJsonPost = async (
  scene: THREE.Scene,
  projectType: ProjectType,
  projectStore: ProjectStore,
  interactionJson: unknown,
  setIsProcessing: Dispatch<React.SetStateAction<boolean>>,
  setIsSuccess: Dispatch<React.SetStateAction<boolean>>
) => {
  const { projectName, thumbnail } = projectStore;
  const mxWorker = new MxWorker();
  // TODO : toJSON이 사용하는 속성들만을 추출하는 함수를 만들어서 사용하도록 해야함.
  const sceneJson = createSceneJson(scene);

  const projectInfo = {
    projectType,
    projectName,
    thumbnail
  };
  mxWorker.postMessage({
    type: MX_WORKER_REQUEST_TYPE.EXPORT_JSON_POST,
    sceneJson,
    interactionJson,
    projectInfo
  });
  mxWorker.onmessage = (e) => {
    setIsProcessing(false);
    if (e.data.type === MX_WORKER_RESPONSE_TYPE.POST_SUCCESS) {
      const { res } = e.data;
      res && console.info('PMX 생성 성공 : ', res);

      setIsSuccess(true);
    } else {
      console.error(e.data.error);
      setIsSuccess(false);
    }
    closeFullScreenLoading();
    mxWorker.terminate();
  };
};
interface Props {
  projectStore: ProjectStore;
}

type hookReturnType = [
  isSuccess: boolean,
  isProcessing: boolean,
  createProject: (projectType: ProjectType) => void,
  downloadMxJson: () => void,
  downloadSceneJson: () => void,
  downloadInteractionJson: () => void
];

const useExportMxJson = ({ projectStore }: Props): hookReturnType => {
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

      const interactionJson = createInteractionJson();
      exportJsonPost(
        projectStore.scene,
        projectType,
        projectStore,
        interactionJson,
        setIsProcessing,
        setIsSuccess
      );
    },
    [projectStore]
  );

  //MXJSON 다운로드 함수
  const downloadMxJson = useCallback(() => {
    if (!projectStore.scene) return;
    setIsProcessing(true);
    setIsSuccess(false);

    restoreCameraTransformation(projectStore.scene);

    const interactionJson = createInteractionJson();
    exportJsonFile(
      projectStore.scene,
      interactionJson,
      setIsProcessing,
      setIsSuccess
    );
  }, [projectStore.scene]);

  const downloadSceneJson = useCallback(() => {
    if (!projectStore.scene) return;
    setIsProcessing(true);
    setIsSuccess(false);

    restoreCameraTransformation(projectStore.scene);

    // TODO : sceneJson 파일 다운로드
  }, [projectStore.scene]);

  /**
   * @description Interaction Json 생성 함수
   */
  const downloadInteractionJson = useCallback(() => {
    setIsProcessing(true);
    setIsSuccess(false);

    const interactionJson = createInteractionJson();
    // TODO : interacionJson 파일 다운로드
  }, []);

  return [
    isSuccess,
    isProcessing,
    createProject,
    downloadMxJson,
    downloadSceneJson,
    downloadInteractionJson
  ];
};

export default useExportMxJson;
