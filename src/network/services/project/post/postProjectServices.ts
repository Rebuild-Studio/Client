import apiModule from "@/network/module/apiModule";
import {
  RequestCreatePmxProject,
  ResponseCreatePmxProject,
} from "./models/postPmxProject.model";
import {
  RequestCreateMxProject,
  ResponseCreateMxProject,
} from "./models/postMxProject.model";

const createMxProject = async (params: RequestCreateMxProject) => {
  try {
    const res = await apiModule.post<ResponseCreateMxProject>(
      "/mx-project/create",
      params
    );
    return res;
  } catch (e) {
    console.error("MX 생성 실패 : ", e);
  }
};

const createPmxProject = async (params: RequestCreatePmxProject) => {
  try {
    const res = await apiModule.post<ResponseCreatePmxProject>(
      "/pmx-project/create",
      params
    );
    return res;
  } catch (e) {
    console.error("PMX 생성 실패 : ", e);
  }
};

const postProjectServices = {
  createMxProject: createMxProject,
  createPmxProject: createPmxProject,
};

export default postProjectServices;
