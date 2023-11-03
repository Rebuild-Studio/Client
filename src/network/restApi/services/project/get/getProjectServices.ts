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
import GetProjectServices from '@/network/type/serviceInterface/project/getProject.interface';

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
  const res = await apiModule.get<CommonResponse<ResponseGetMxProject>>(
    `/mx-project/load`,
    {
      params
    }
  );
  return res.data.result;
};

const checkDuplicatePmxProjectName = async (params: {
  projectName: string;
}) => {
  const res = await apiModule.get<CommonResponse<boolean>>(
    `/pmx-project/check/${params.projectName}`
  );
  return res.data.result;
};

const getAllPmxProjectList = async () => {
  const res = await apiModule.get<CommonResponse<ResponseGetPmxProjectList>>(
    `/pmx-project/load/list/all`
  );
  return res.data.result;
};

const getMyPmxProjectList = async () => {
  const res = await apiModule.get<CommonResponse<ResponseGetPmxProjectList>>(
    `/pmx-project/load/list/mine`
  );
  return res.data.result;
};

const getPmxProject = async (params: RequestGetPmxProject) => {
  const res = await apiModule.get<CommonResponse<ResponseGetPmxProject>>(
    `/pmx-project/load`,
    {
      params
    }
  );
  return res.data.result;
};

const getProjectServices: GetProjectServices = {
  getMyMxProjectList,
  getMxProject,
  checkDuplicatePmxProjectName,
  getAllPmxProjectList,
  getMyPmxProjectList,
  getPmxProject
};

export default getProjectServices;
