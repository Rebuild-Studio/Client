import { Project } from './project.model';

interface RequestGetPmxProject {
  pmxId: string;
}

interface ResponseGetPmxProject extends Project {}

export type { RequestGetPmxProject, ResponseGetPmxProject };
