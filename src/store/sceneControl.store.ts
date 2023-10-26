import { makeAutoObservable } from 'mobx';

class SceneControlStore {
  exportScene = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setExportScene(exportScene: boolean) {
    this.exportScene = exportScene;
  }
  initExportScene() {
    this.exportScene = false;
  }
}

const sceneControlStore = new SceneControlStore();

export default sceneControlStore;
