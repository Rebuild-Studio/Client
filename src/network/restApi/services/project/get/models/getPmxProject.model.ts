import { Project } from './project.model';

interface RequestGetPmxProject {
  projectId: string;
}
interface ResponseGetPmxProject {
  result: Project;
}

export type { RequestGetPmxProject, ResponseGetPmxProject };
