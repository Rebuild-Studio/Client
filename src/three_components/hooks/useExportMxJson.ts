import { SceneControlStore } from "@/store/sceneControlStore";
import downloadFile from "@/utils/file/downloadFile";
import { Dispatch, useEffect, useState } from "react";
import SceneWorker from "./workerScript?worker";

const sceneWorker = new SceneWorker();

const exportJson = async (
  scene: THREE.Scene,
  setIsProcessing: Dispatch<React.SetStateAction<boolean>>,
  setIsSuccess: Dispatch<React.SetStateAction<boolean>>
) => {
  // TODO : toJSON이 사용하는 속성들만을 추출하는 함수를 만들어서 사용하도록 해야함.
  const sceneJson = scene.toJSON();
  sceneWorker.postMessage({ type: "exportJson", sceneJson });
  sceneWorker.onmessage = (e) => {
    if (e.data.type === "download") {
      const { stringifiedJson } = e.data;
      downloadFile(stringifiedJson, "mxJson.json", "json");

      setIsProcessing(false);
      setIsSuccess(true);
    } else {
      console.error("잘못된 요청 타입입니다: ", e.data.type);
    }
  };
};
interface Props {
  scene: THREE.Scene;
  sceneControlStore: SceneControlStore;
}
const useExportMxJson = ({ scene, sceneControlStore }: Props) => {
  const exportSceneJsonTrigger = sceneControlStore.exportSceneJsonTrigger;

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!exportSceneJsonTrigger) return;
    setIsSuccess(false);
    setIsProcessing(true);
    setTimeout(() => {
      exportJson(scene, setIsProcessing, setIsSuccess);
    }, 1000);
    sceneControlStore.initExportSceneJsonTrigger();
  }, [exportSceneJsonTrigger, scene, sceneControlStore]);

  useEffect(() => {
    isSuccess && setIsSuccess(false);
  }, [isSuccess]);

  return [isSuccess, isProcessing];
};

export default useExportMxJson;
