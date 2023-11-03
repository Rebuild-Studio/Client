import { MxJson } from '@/types/mxJson/mxJson';

interface RequestCreatePmxProject {
  pmxName: string;
  thumbnail: string;
  mxJson: MxJson;
}

interface ResponseCreatePmxProject {
  id: string;
  taskName: string;
  userId: string;
  createdAt: string;
}

export type { RequestCreatePmxProject, ResponseCreatePmxProject };
