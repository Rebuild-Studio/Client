import apiModule from "@/network/module/apiModule";
import { Project } from "./models/project.model";

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
    const res = await apiModule.get<Project[]>(`/pmx-project/load/list/all`);
    return res;
  } catch (e) {
    console.error("PMX 리스트 조회 실패 : ", e);
  }
};

const getMyPmxProjectList = async () => {
  try {
    const res = await apiModule.get<Project[]>(`/pmx-project/load/list/mine`);
    return res;
  } catch (e) {
    console.error("PMX 리스트 조회 실패 : ", e);
  }
};

const getPmxProject = async (param: { projectId: string }) => {
  try {
    const res = await apiModule.get<Project>(
      `/pmx-project/load/${param.projectId}`
    );
    return res;
  } catch (e) {
    console.error("PMX 조회 실패 : ", e);
  }
};

const getMyMxProjectList = async () => {
  try {
    const res = await apiModule.get<Project[]>(`/mx-project/load/list/mine`);
    return res;
  } catch (e) {
    console.error("MX 리스트 조회 실패 : ", e);
  }
};

const getMxProject = async (param: { projectId: string }) => {
  try {
    const res = await apiModule.get<Project>(
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
