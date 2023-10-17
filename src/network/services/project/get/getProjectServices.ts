import apiModule from "@network/module/apiModule";
import { RequestMySpecificProject } from "./models/GetProjectModels";

const getMyProject = async () => {
  const res = await apiModule.get("/project/mine");

  return res;
};

const getMySpecificProject = async (params: RequestMySpecificProject) => {
  const res = await apiModule.get(`/project/mine/${params.projectId}`);

  return res;
};

const getProjectServices = {
  getMyProject: getMyProject,
  getMySpecificProject: getMySpecificProject
};

export default getProjectServices;
