import { common_store } from "../../stores/Common_Store";
import { scene_store } from "../../stores/Scene_Store";

const HotKeyFunctionsAboutSceneSettingViewModel = {
  dlToggle: () => {
    if (!common_store.isPreview && common_store.curCategory === "canvas")
      scene_store.dlToggle = !scene_store.dlToggle;
  },

  alToggle: () => {
    if (!common_store.isPreview && common_store.curCategory === "canvas")
      scene_store.alToggle = !scene_store.alToggle;
  },

  cameraPreviewOn: () => {
    if (!common_store.isPreview && common_store.curCategory === "canvas") {
      common_store.SetCameraPreviewOn(!common_store.cameraPreviewOn);
    }
  },
};

export { HotKeyFunctionsAboutSceneSettingViewModel };
