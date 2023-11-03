import {
  RequestDeleteMxProject,
  ResponseDeleteMxProject
} from '@/network/model/project/delete/deleteMxProject.model';
import {
  RequestDeletePmxProject,
  ResponseDeletePmxProject
} from '@/network/model/project/delete/deletePmxProject.model';

interface DeleteProjectServices {
  deleteMxProject: (
    params: RequestDeleteMxProject
  ) => Promise<ResponseDeleteMxProject>;
  deletePmxProject: (
    params: RequestDeletePmxProject
  ) => Promise<ResponseDeletePmxProject>;
}

export default DeleteProjectServices;
