import { MxJson } from "@/types/mxJson/mxJson";

interface RequestUpdateProject {
  projectId: string;
  thumbnail: string;
  mxJson: MxJson;
}

export type { RequestUpdateProject };
