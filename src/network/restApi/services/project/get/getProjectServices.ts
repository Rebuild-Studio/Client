import { CommonResponse } from '@/network/model/common/response.model';
import {
  RequestGetMxProject,
  ResponseGetMxProject
} from '@/network/model/project/get/getMxProject.model';
import {
  RequestGetMxProjectList,
  ResponseGetMxProjectList
} from '@/network/model/project/get/getMxProjectList.model';
import {
  RequestGetPmxProject,
  ResponseGetPmxProject
} from '@/network/model/project/get/getPmxProject.model';
import { ResponseGetPmxProjectList } from '@/network/model/project/get/getPmxProjectList.model';
import apiModule from '@/network/module/apiModule';

const getMyMxProjectList = async (
  params: RequestGetMxProjectList
): Promise<ResponseGetMxProjectList> => {
  const res = await apiModule.get<CommonResponse<ResponseGetMxProjectList>>(
    `/mx-project/load/list/mine`,
    { params }
  );
  return res.data.result;
};

const getMxProject = async (params: RequestGetMxProject) => {
  try {
    const res = await apiModule.get<CommonResponse<ResponseGetMxProject>>(
      `/mx-project/load`,
      {
        params
      }
    );
    return res.data.result;
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
    const res = await apiModule.get<CommonResponse<ResponseGetPmxProjectList>>(
      `/pmx-project/load/list/all`
    );
    return res.data.result;
  } catch (e) {
    console.error('PMX 리스트 조회 실패 : ', e);
  }
};

const getMyPmxProjectList = async () => {
  try {
    const res = await apiModule.get<CommonResponse<ResponseGetMxProjectList>>(
      `/pmx-project/load/list/mine`
    );
    return res.data.result;
  } catch (e) {
    console.error('PMX 리스트 조회 실패 : ', e);
  }
};

const getPmxProject = async (params: RequestGetPmxProject) => {
  try {
    const res = await apiModule.get<CommonResponse<ResponseGetPmxProject>>(
      `/pmx-project/load`,
      {
        params
      }
    );
    return res.data.result;
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
