import {
  RequestDeleteMxProject,
  ResponseDeleteMxProject
} from '@/network/model/project/delete/deleteMxProject.model';
import {
  RequestDeletePmxProject,
  ResponseDeletePmxProject
} from '@/network/model/project/delete/deletePmxProject.model';
import DeleteProjectServices from '@/network/type/serviceInterface/project/deleteProject.interface';
import sasApiHandler from '@/network/webSocket/utils/sasApiHandler';

const deleteMxProject = async (params: RequestDeleteMxProject) => {
  return sasApiHandler<RequestDeleteMxProject, ResponseDeleteMxProject>(
    'DeleteMxController',
    params
  );
};

const deletePmxProject = async (params: RequestDeletePmxProject) => {
  return sasApiHandler<RequestDeletePmxProject, ResponseDeletePmxProject>(
    'DeletePmxController',
    params
  );
};

const deleteProjectServices: DeleteProjectServices = {
  deleteMxProject,
  deletePmxProject
};

export default deleteProjectServices;
