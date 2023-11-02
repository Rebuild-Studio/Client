import sasApiHandler from '@/network/webSocket/utils/sasApiHandler';
import {
  RequestDeleteMxProject,
  ResponseDeleteMxProject
} from './model/deleteMxProject.model';

const deleteMxProject = async (params: RequestDeleteMxProject) => {
  return sasApiHandler<RequestDeleteMxProject, ResponseDeleteMxProject>(
    'DeleteMxController',
    params
  );
};

const deletePmxProject = async (params: RequestDeleteMxProject) => {
  return sasApiHandler<RequestDeleteMxProject, ResponseDeleteMxProject>(
    'DeletePmxController',
    params
  );
};

const deleteProjectServices = {
  deleteMxProject,
  deletePmxProject
};

export default deleteProjectServices;
