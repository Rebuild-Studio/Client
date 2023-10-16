import { MxJson } from "@/types/mxJson/mxJson";

interface RequestCreatePmxProject {
  projectName: string;
  thumnail: string;
  mxJson: MxJson;
}

interface ResponseCreatePmxProject {}

export type { RequestCreatePmxProject, ResponseCreatePmxProject };
