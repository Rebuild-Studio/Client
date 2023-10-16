import { observable } from "mobx";

type Triggers = {
  file: boolean;
  post: boolean;
};

type ProjectType = "MX" | "PMX";
interface SceneControlStore {
  exportMxJsonTrigger: Triggers;
  createProjectType: ProjectType;

  setExportMxJsonTrigger: (triggerType: "file" | "post") => void;
  initExportMxJsonTrigger: () => void;
  setCreateProjectType: (projectType: ProjectType) => void;
  setTriggerAndProjectType: (
    projectType: ProjectType,
    triggerType?: "file" | "post"
  ) => void;
}

const initialTriggers: Triggers = {
  file: false,
  post: false,
};

const sceneControlStore = observable<SceneControlStore>({
  exportMxJsonTrigger: initialTriggers,
  createProjectType: "MX",

  setExportMxJsonTrigger(triggerType) {
    this.exportMxJsonTrigger[triggerType] = true;
  },
  initExportMxJsonTrigger() {
    this.exportMxJsonTrigger = initialTriggers;
  },
  setCreateProjectType(projectType) {
    this.createProjectType = projectType;
  },
  setTriggerAndProjectType(projectType, triggerType = "post") {
    this.setExportMxJsonTrigger(triggerType);
    this.setCreateProjectType(projectType);
  },
});

export type { SceneControlStore };
export default sceneControlStore;
