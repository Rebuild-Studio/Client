import { makeAutoObservable } from 'mobx';
import { Project, ProjectList } from '../types/project';

export class ProjectStore {
  currentPage = 1;
  projectList: ProjectList<Project> = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setCurrentPage(currentPage: number) {
    this.currentPage = currentPage;
  }
  setProjectList(projectList: ProjectList<Project>) {
    this.projectList = [...this.projectList, ...projectList];
  }
  initProjectList() {
    this.projectList = [];
  }
}

const projectStore = new ProjectStore();

export default projectStore;
