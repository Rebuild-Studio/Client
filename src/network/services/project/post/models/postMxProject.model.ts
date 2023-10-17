import { MxJson } from "@/types/mxJson/mxJson";

interface RequestCreateMxProject {
  projectName: string;
  thumbnail: string;
  mxJson: MxJson;
}

interface ResponseCreateMxProject {}

export type { RequestCreateMxProject, ResponseCreateMxProject };
