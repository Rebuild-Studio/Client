import apiModule from "@/network/module/apiModule";
import { RequestUpdateProject } from "./models/patchProject.model";

const updateMxProject = async (params: RequestUpdateProject) => {
  const res = await apiModule.patch(`/mx-project/update`, params);

  return res;
};

const updateProjectServices = {
  updateMxProject: updateMxProject,
};

export default updateProjectServices;
