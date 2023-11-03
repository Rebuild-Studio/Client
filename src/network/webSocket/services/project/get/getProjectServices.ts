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
import sasApiHandler from '@/network/webSocket/utils/sasApiHandler';

const getMyMxProjectList = async (params: RequestGetMxProjectList) => {
  return sasApiHandler<RequestGetMxProjectList, ResponseGetMxProjectList>(
    'FindMyMxController',
    params
  );
};

const getMxProject = async (params: RequestGetMxProject) => {
  return sasApiHandler<RequestGetMxProject, ResponseGetMxProject>(
    'ReadMxController',
    params
  );
};

const getAllPmxProjectList = async () => {
  return sasApiHandler<null, ResponseGetPmxProjectList>('FindAllPmxController');
};

const getMyPmxProjectList = async () => {
  return sasApiHandler<null, ResponseGetPmxProjectList>('FindMyPmxController');
};

const getPmxProject = async (params: RequestGetPmxProject) => {
  return sasApiHandler<RequestGetPmxProject, ResponseGetPmxProject>(
    'ReadPmxController',
    params
  );
};

const getProjectServices = {
  getMyMxProjectList,
  getMxProject,
  getAllPmxProjectList,
  getMyPmxProjectList,
  getPmxProject
};

export default getProjectServices;
