import { Project } from './project.model';

interface RequestGetMxProject {
  mxId: string;
}

interface ResponseGetMxProject extends Project {}

export type { RequestGetMxProject, ResponseGetMxProject };
