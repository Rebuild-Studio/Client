import {
  RequestDeleteMxProject,
  ResponseDeleteMxProject
} from '@/network/model/project/delete/deleteMxProject.model';
import {
  RequestDeletePmxProject,
  ResponseDeletePmxProject
} from '@/network/model/project/delete/deletePmxProject.model';
import apiModule from '@/network/module/apiModule';

const deleteMxProject = async (params: RequestDeleteMxProject) => {
  const res = await apiModule.delete<ResponseDeleteMxProject>(
    `/mx-project/delete`,
    {
      params: {
        ...params
      }
    }
  );

  return res;
};

const deletePmxProject = async (params: RequestDeletePmxProject) => {
  const res = await apiModule.delete<ResponseDeletePmxProject>(
    `/pmx-project/delete`,
    {
      params: {
        ...params
      }
    }
  );

  return res;
};

const deleteProjectServices = {
  deleteMxProject,
  deletePmxProject
};

export default deleteProjectServices;
