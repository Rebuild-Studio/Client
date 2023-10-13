import apiModule from "@/network/module/apiModule";
import {
  RequestSearchProject,
  RequestUploadProject,
} from "./models/PostProjectModels";
import {
  RequestUploadPmxProject,
  ResponseUploadPmxProject,
} from "./models/PostPmxProjectModels";

const uploadProject = async (params: RequestUploadProject) => {
  const res = await apiModule.post("/project", params);

  return res;
};

//TODO: 바뀔 api parameter 적용 필요
const uploadPmxProject = async (params: RequestUploadPmxProject) => {
  try {
    const res = await apiModule.post<ResponseUploadPmxProject>(
      "/store-pmx",
      params
    );
    return res;
  } catch (e) {
    console.error("PMX 생성 실패 : ", e);
  }
};

const searchProject = async (params: RequestSearchProject) => {
  const res = await apiModule.post("/project/search", params);

  return res;
};

const postProjectServices = {
  uploadProject: uploadProject,
  uploadPmxProject: uploadPmxProject,
  searchProject: searchProject,
};

export default postProjectServices;
