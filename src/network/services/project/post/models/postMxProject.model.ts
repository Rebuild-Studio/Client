import { MxJson } from "@/types/mxJson/mxJson";

interface RequestCreateMxProject {
  projectName: string;
  thumnail: string;
  mxJson: MxJson;
}

interface ResponseCreateMxProject {}

export type { RequestCreateMxProject, ResponseCreateMxProject };
