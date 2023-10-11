import storeContainer from "../stores/storeContainer";
import { objectViewModel } from "./Object_VM";

export default function SceneUpdate_VM() {
  const { common_store } = storeContainer;

  function SceneUpdate(camera, delta) {
    if (common_store.isPreview === true) {
      for (const object of objectViewModel.metaObjects) {
        if (object.mesh !== null) {
          if (object.mixer != null) {
            object.mixer.update(delta);
          }
        }
      }
    }

    common_store.orbitcontrol.update();
  }

  return {
    SceneUpdate,
  };
}
