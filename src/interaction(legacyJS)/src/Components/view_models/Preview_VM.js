import { common_store } from "../stores/Common_Store";
import { objectViewModel } from "../view_models/Object_VM";
import { scene_store } from "../stores/Scene_Store";
import { preview_store } from "../stores/Preview_Store";
import lightViewModel from "./Light_VM";
import { renderingContext_store } from "../stores/RenderingContext_Store";
import { object_store } from "../stores/Object_Store";
import { ObjectControllerVM } from "./ObjectController_VM";

const previewViewModel = {
  previewModeHandler: async (e) => {
    e.currentTarget.blur();
    if (common_store.isPreview) {
      previewViewModel.stopAllAnimation();
      common_store.setIsPreview(false);
      lightViewModel.setLightMeshVisibility(true);
      scene_store.grid.visible = true;
      common_store.orbitcontrol.enabled = true;
      common_store.orientationHelper.domElement.style.zIndex = 1;
      previewViewModel.loadAfterPreview();
    } else {
      renderingContext_store.gl.domElement.tabIndex = -1;
      renderingContext_store.gl.domElement.focus();
      common_store.setIsPreview(true);
      common_store.SetCameraPreviewOn(false);
      ObjectControllerVM.DeSelectAll();
      lightViewModel.setLightMeshVisibility(false);
      scene_store.grid.visible = false;
      common_store.orientationHelper.domElement.style.zIndex = -1;
      await previewViewModel.saveBeforePreview();
    }
  },

  async saveBeforePreview() {
    const metaObjects = [];

    for (const metaObject of objectViewModel.renderObjects) {
      const metaJson = await metaObject.toJson("preview");
      metaObjects.push(metaJson);
    }

    preview_store.prevMetaObjects = JSON.stringify(metaObjects);
  },

  stopAllAnimation() {
    for (const object of objectViewModel.metaObjects) {
      if (object.mixer != null) object.mixer.stopAllAction();
    }
  },

  async loadAfterPreview() {
    for (var i = 0; i < objectViewModel.renderObjects.length; i++) {
      common_store.setIsLoading(true);

      const parsingData = JSON.parse(preview_store.prevMetaObjects)[i];

      await object_store.renderObjects[i].ReConstructor("preview", parsingData);
      common_store.setIsLoading(false);
    }
    preview_store.prevMetaObjects = [];
  },
};

export { previewViewModel };
