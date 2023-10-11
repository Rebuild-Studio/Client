import { observable } from "mobx";

interface SceneControlStore {
  exportSceneJsonTrigger: boolean;

  setExportSceneJsonTrigger: (trigger: boolean) => void;
  initExportSceneJsonTrigger: () => void;
}

const sceneControlStore = observable<SceneControlStore>({
  exportSceneJsonTrigger: false,

  setExportSceneJsonTrigger(trigger) {
    this.exportSceneJsonTrigger = trigger;
  },
  initExportSceneJsonTrigger() {
    this.exportSceneJsonTrigger = false;
  },
});

export type { SceneControlStore };
export default sceneControlStore;
