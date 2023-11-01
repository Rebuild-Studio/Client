import { MxJson } from '@/types/mxJson/mxJson';

interface RequestCreatePmxProject {
  projectName: string;
  thumbnail: string;
  mxJson: MxJson;
}

interface ResponseCreatePmxProject {}

export type { RequestCreatePmxProject, ResponseCreatePmxProject };
