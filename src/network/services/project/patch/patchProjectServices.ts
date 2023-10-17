import apiModule from "@network/module/apiModule";
import { RequestModifyProject } from "./models/PatchProjectModels";

const modifyProject = async (params: RequestModifyProject) => {
  const res = await apiModule.patch(`/project/${params.projectId}`);

  return res;
};

const modifyProjectServices = {
  modifyProject: modifyProject,
};

export default modifyProjectServices;
