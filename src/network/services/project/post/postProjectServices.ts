import apiModule from "@network/module/apiModule";
import {
  RequestSearchProject,
  RequestUploadProject
} from "./models/PostProjectModels";

const uploadProject = async (params: RequestUploadProject) => {
  const res = await apiModule.post("/project", params);

  return res;
};

const searchProject = async (params: RequestSearchProject) => {
  const res = await apiModule.post("/project/search", params);

  return res;
};

const postProjectServices = {
  uploadProject: uploadProject,
  searchProject: searchProject
};

export default postProjectServices;
