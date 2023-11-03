import {
  RequestGetMxProject,
  ResponseGetMxProject
} from '@/network/model/project/get/getMxProject.model';
import { ResponseGetMxProjectList } from '@/network/model/project/get/getMxProjectList.model';
import {
  RequestGetPmxProject,
  ResponseGetPmxProject
} from '@/network/model/project/get/getPmxProject.model';
import { ResponseGetPmxProjectList } from '@/network/model/project/get/getPmxProjectList.model';
import apiModule from '@/network/module/apiModule';

const getMyMxProjectList = async (): Promise<ResponseGetMxProjectList> => {
  const res = await apiModule.get<ResponseGetMxProjectList>(
    `/mx-project/load/list/mine`
  );

  return res.data;
};

const getMxProject = async (params: RequestGetMxProject) => {
  try {
    const res = await apiModule.get<ResponseGetMxProject>(`/mx-project/load`, {
      params
    });
    return res;
  } catch (e) {
    console.error('MX 조회 실패 : ', e);
  }
};

const checkDuplicatePmxProjectName = async (param: { projectName: string }) => {
  try {
    const res = await apiModule.get<boolean>(
      `/pmx-project/check/${param.projectName}`
    );
    return res;
  } catch (e) {
    console.error('PMX 중복 이름 체크 실패 : ', e);
  }
};

const getAllPmxProjectList = async () => {
  try {
    const res = await apiModule.get<ResponseGetPmxProjectList>(
      `/pmx-project/load/list/all`
    );
    return res;
  } catch (e) {
    console.error('PMX 리스트 조회 실패 : ', e);
  }
};

const getMyPmxProjectList = async () => {
  try {
    const res = await apiModule.get<ResponseGetMxProjectList>(
      `/pmx-project/load/list/mine`
    );
    return res;
  } catch (e) {
    console.error('PMX 리스트 조회 실패 : ', e);
  }
};

const getPmxProject = async (params: RequestGetPmxProject) => {
  try {
    const res = await apiModule.get<ResponseGetPmxProject>(
      `/pmx-project/load`,
      {
        params
      }
    );
    return res;
  } catch (e) {
    console.error('PMX 조회 실패 : ', e);
  }
};

const getProjectServices = {
  getMyMxProjectList,
  getMxProject,
  checkDuplicatePmxProjectName,
  getAllPmxProjectList,
  getMyPmxProjectList,
  getPmxProject
};

export default getProjectServices;
