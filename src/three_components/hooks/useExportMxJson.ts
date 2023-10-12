import { SceneControlStore } from "@/store/sceneControlStore";
import downloadFile from "@/utils/file/downloadFile";
import createMxJson from "@/utils/json/createMxJson";
import { Dispatch, useEffect, useState } from "react";

const exportJson = async (
  scene: THREE.Scene,
  setIsProcessing: Dispatch<React.SetStateAction<boolean>>,
  setIsSuccess: Dispatch<React.SetStateAction<boolean>>
) => {
  const sceneJson = scene.toJSON();
  const mxJson = createMxJson(sceneJson);
  await downloadFile(JSON.stringify(mxJson), "mxJson.json", "json");
  setIsProcessing(false);
  setIsSuccess(true);
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

  return [isSuccess, isProcessing];
};

export default useExportMxJson;
