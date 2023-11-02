import { MxJson } from '@/types/mxJson/mxJson';

interface RequestCreateMxProject {
  taskName: string;
  thumbnail: ArrayBuffer;
  mxJson: MxJson;
}

interface ResponseCreateMxProject {
  id: string;
  taskName: string;
  userId: string;
  createdAt: string;
}

export type { RequestCreateMxProject, ResponseCreateMxProject };
