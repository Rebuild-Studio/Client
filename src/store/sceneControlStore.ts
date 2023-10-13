import { observable } from "mobx";

type Triggers = {
  file: boolean;
  post: boolean;
};
interface SceneControlStore {
  exportMxJsonTrigger: Triggers;

  setExportMxJsonTrigger: (triggerType: "file" | "post") => void;
  initExportMxJsonTrigger: () => void;
}

const initialTriggers: Triggers = {
  file: false,
  post: false,
};

const sceneControlStore = observable<SceneControlStore>({
  exportMxJsonTrigger: initialTriggers,

  setExportMxJsonTrigger(triggerType) {
    this.exportMxJsonTrigger[triggerType] = true;
  },
  initExportMxJsonTrigger() {
    this.exportMxJsonTrigger = initialTriggers;
  },
});

export type { SceneControlStore };
export default sceneControlStore;
