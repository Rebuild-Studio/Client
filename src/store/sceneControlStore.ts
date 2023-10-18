import { observable } from "mobx";

interface SceneControlStore {
  exportScene: boolean;

  setExportScene: (exportScene: boolean) => void;
  initExportScene: () => void;
}

const sceneControlStore = observable<SceneControlStore>({
  exportScene: false,

  setExportScene(exportScene) {
    this.exportScene = exportScene;
  },
  initExportScene() {
    this.exportScene = false;
  },
});

export default sceneControlStore;
