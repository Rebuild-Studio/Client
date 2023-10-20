import apiModule from "@/network/module/apiModule";
import { ResponseGetMxProjectList } from "./models/getMxProjectList.model";
import {
  RequestGetPmxProject,
  ResponseGetPmxProject,
} from "./models/getPmxProject.model";
import {
  RequestGetMxProject,
  ResponseGetMxProject,
} from "./models/getMxProject.model";
import { ResponseGetPmxProjectList } from "./models/getPmxProjectList.model";

const checkDuplicatePmxProjectName = async (param: { projectName: string }) => {
  try {
    const res = await apiModule.get<boolean>(
      `/pmx-project/check/${param.projectName}`
    );
    return res;
  } catch (e) {
    console.error("PMX 중복 이름 체크 실패 : ", e);
  }
};

const getAllPmxProjectList = async () => {
  try {
    const res = await apiModule.get<ResponseGetPmxProjectList>(
      `/pmx-project/load/list/all`
    );
    return res;
  } catch (e) {
    console.error("PMX 리스트 조회 실패 : ", e);
  }
};

const getMyPmxProjectList = async () => {
  try {
    const res = await apiModule.get<ResponseGetMxProjectList>(
      `/pmx-project/load/list/mine`
    );
    return res;
  } catch (e) {
    console.error("PMX 리스트 조회 실패 : ", e);
  }
};

const getPmxProject = async (param: RequestGetPmxProject) => {
  try {
    const res = await apiModule.get<ResponseGetPmxProject>(
      `/pmx-project/load/${param.projectId}`
    );
    return res;
  } catch (e) {
    console.error("PMX 조회 실패 : ", e);
  }
};

const getMyMxProjectList = async (): Promise<ResponseGetMxProjectList> => {
  const res = await apiModule.get<ResponseGetMxProjectList>(
    `/mx-project/load/list/mine`
  );

  return res.data;
};

const getMxProject = async (param: RequestGetMxProject) => {
  try {
    const res = await apiModule.get<ResponseGetMxProject>(
      `/mx-project/load/${param.projectId}`
    );
    return res;
  } catch (e) {
    console.error("MX 조회 실패 : ", e);
  }
};

const getProjectServices = {
  checkDuplicatePmxProjectName: checkDuplicatePmxProjectName,
  getAllPmxProjectList: getAllPmxProjectList,
  getMyPmxProjectList: getMyPmxProjectList,
  getPmxProject: getPmxProject,
  getMyMxProjectList: getMyMxProjectList,
  getMxProject: getMxProject,
};

export default getProjectServices;
