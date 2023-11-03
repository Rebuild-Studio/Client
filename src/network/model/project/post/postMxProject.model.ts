import { MxJson } from '@/types/mxJson/mxJson';

interface RequestCreateMxProject {
  mxName: string;
  thumbnail: string;
  mxJson: MxJson;
}

interface ResponseCreateMxProject {
  id: string;
  taskName: string;
  userId: string;
  createdAt: string;
}

export type { RequestCreateMxProject, ResponseCreateMxProject };
