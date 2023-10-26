import { MxJson } from "@/types/mxJson/mxJson";
import { makeAutoObservable } from "mobx";

type ProjectType = "MX" | "PMX";
type ExportType = "file" | "post";

type ProjectInfo = {
  projectId: string;
  projectType: ProjectType;
  projectName: string;
  thumbnail: string;
};

export class ProjectStore {
  projectId = "";
  projectType: ProjectType = "MX";
  projectName = "컴포넌트 이름";
  thumbnail = "none";
  renderer: THREE.WebGLRenderer | null = null;
  scene: THREE.Scene | null = null;
  mxJson: MxJson | null = null;
  exportType: ExportType | "none" = "none";
  selectedProject: ProjectInfo | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setProjectId(projectId: string) {
    this.projectId = projectId;
  }
  setProjectType(projectType: ProjectType) {
    this.projectType = projectType;
  }
  setProjectName(projectName: string) {
    this.projectName = projectName;
  }
  setThumbnail(thumbnail: string) {
    this.thumbnail = thumbnail;
  }
  setRenderer(renderer: THREE.WebGLRenderer) {
    this.renderer = renderer;
  }
  setScene(scene: THREE.Scene) {
    this.scene = scene;
  }
  setExportType(exportType: ExportType) {
    this.exportType = exportType;
  }
  setSelectedProject(selectedProject: ProjectInfo) {
    this.selectedProject = selectedProject;
  }
  clearSelectedProject() {
    this.selectedProject = null;
  }
  setMxJson(mxJson: MxJson) {
    this.mxJson = mxJson;
  }
  clearMxJson() {
    this.mxJson = null;
  }
  setProjectInfo(projectInfo: ProjectInfo) {
    this.setProjectId(projectInfo.projectId);
    this.setProjectType(projectInfo.projectType);
    this.setProjectName(projectInfo.projectName);
    this.setThumbnail(projectInfo.thumbnail);
  }
  initAfterExport() {
    this.exportType = "none";
  }
}

const projectStore = new ProjectStore();

export type { ProjectType, ExportType, ProjectInfo };
export default projectStore;
