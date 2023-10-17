import { observable } from "mobx";

type ProjectType = "MX" | "PMX";

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

  setProjectId: (projectId: string) => void;
  setProjectType: (projectType: ProjectType) => void;
  setProjectName: (projectName: string) => void;
  setThumbnail: (thumbnail: string) => void;

  setProjectInfo: (projectInfo: ProjectInfo) => void;
};

const projectStore = observable<ProjectStore>({
  projectId: "",
  projectType: "MX",
  projectName: "",
  thumbnail: "",

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

  setProjectInfo(projectInfo) {
    this.setProjectId(projectInfo.projectId);
    this.setProjectType(projectInfo.projectType);
    this.setProjectName(projectInfo.projectName);
    this.setThumbnail(projectInfo.thumbnail);
  },
});

export type { ProjectType, ProjectInfo };
export default projectStore;
