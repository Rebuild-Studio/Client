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
  exportType: ExportType | "none";

  setProjectId: (projectId: string) => void;
  setProjectType: (projectType: ProjectType) => void;
  setProjectName: (projectName: string) => void;
  setThumbnail: (thumbnail: string) => void;
  setScene: (scene: THREE.Scene) => void;
  setExportType: (exportType: ExportType) => void;

  setProjectInfo: (projectInfo: ProjectInfo) => void;
  initAfterExport: () => void;
};

const projectStore = observable<ProjectStore>({
  projectId: "",
  projectType: "MX",
  projectName: "컴포넌트 이름 (1)",
  thumbnail:
    "https://w7.pngwing.com/pngs/940/589/png-transparent-linkedin-free-text-telephone-call-trademark-thumbnail.png",
  scene: null,
  exportType: "none",

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
