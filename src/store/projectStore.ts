import { MxJson } from "@/types/mxJson/mxJson";
import { observable } from "mobx";

type ProjectType = "MX" | "PMX";
type ExportType = "file" | "post";

type ProjectInfo = {
  projectId: string;
  projectType: ProjectType;
  projectName: string;
  thumbnail: string;
};

export type ProjectStore = {
  projectId: string;
  projectType: ProjectType;
  projectName: string;
  thumbnail: string;
  scene: THREE.Scene | null;
  mxJson: MxJson | null;
  exportType: ExportType | "none";
  selectedProject: ProjectInfo | null;

  setProjectId: (projectId: string) => void;
  setProjectType: (projectType: ProjectType) => void;
  setProjectName: (projectName: string) => void;
  setThumbnail: (thumbnail: string) => void;
  setScene: (scene: THREE.Scene) => void;
  setMxJson: (mxJson: MxJson) => void;
  setExportType: (exportType: ExportType) => void;
  setSelectedProject: (projectInfo: ProjectInfo) => void;
  clearSelectedProject: () => void;
  clearMxJson: () => void;

  setProjectInfo: (projectInfo: ProjectInfo) => void;
  initAfterExport: () => void;
};

const projectStore = observable<ProjectStore>({
  projectId: "",
  projectType: "MX",
  projectName: "test",
  thumbnail: "none",
  scene: null,
  mxJson: null,
  exportType: "none",
  selectedProject: null,

  setProjectId(projectId) {
    this.projectId = projectId;
  },
  setProjectType(projectType) {
    this.projectType = projectType;
  },
  setProjectName(projectName) {
    this.projectName = projectName;
  },
  setThumbnail(thumbnail) {
    this.thumbnail = thumbnail;
  },
  setScene(scene) {
    this.scene = scene;
  },
  setExportType(exportType) {
    this.exportType = exportType;
  },
  setSelectedProject(selectedProject) {
    this.selectedProject = selectedProject;
  },
  clearSelectedProject() {
    this.selectedProject = null;
  },
  setMxJson(mxJson) {
    this.mxJson = mxJson;
  },
  clearMxJson() {
    this.mxJson = null;
  },

  setProjectInfo(projectInfo) {
    this.setProjectId(projectInfo.projectId);
    this.setProjectType(projectInfo.projectType);
    this.setProjectName(projectInfo.projectName);
    this.setThumbnail(projectInfo.thumbnail);
  },
  initAfterExport() {
    this.exportType = "none";
  },
});

export type { ProjectType, ExportType, ProjectInfo };
export default projectStore;
