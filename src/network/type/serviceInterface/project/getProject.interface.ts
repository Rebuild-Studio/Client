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

interface GetProjectServices {
  getMyMxProjectList: (
    params: RequestGetMxProjectList
  ) => Promise<ResponseGetMxProjectList>;
  getMxProject: (params: RequestGetMxProject) => Promise<ResponseGetMxProject>;
  getAllPmxProjectList: () => Promise<ResponseGetPmxProjectList>;
  getMyPmxProjectList: () => Promise<ResponseGetPmxProjectList>;
  getPmxProject: (
    params: RequestGetPmxProject
  ) => Promise<ResponseGetPmxProject>;
  checkDuplicatePmxProjectName?: (params: {
    projectName: string;
  }) => Promise<boolean>;
}

export default GetProjectServices;
