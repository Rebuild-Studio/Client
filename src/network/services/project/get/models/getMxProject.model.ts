import { Project } from "./project.model";

interface RequestGetMxProject {
  projectId: string;
}
interface ResponseGetMxProject {
  result: Project;
}

export type { RequestGetMxProject, ResponseGetMxProject };
