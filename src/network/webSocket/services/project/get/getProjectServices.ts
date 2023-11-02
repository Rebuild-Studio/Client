import sasApiHandler from '@/network/webSocket/utils/sasApiHandler';
import {
  RequestGetMxProject,
  ResponseGetMxProject
} from './model/getMxProject.model';
import {
  RequestGetMxProjectList,
  ResponseGetMxProjectList
} from './model/getMxProjectList.model';
import {
  RequestGetPmxProject,
  ResponseGetPmxProject
} from './model/getPmxProject.model';
import { ResponseGetPmxProjectList } from './model/getPmxProjectList.model';

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
