import { RequestUpdateProject } from '@/network/model/project/patch/patchProject.model';
import apiModule from '@/network/module/apiModule';

const updateMxProject = async (params: RequestUpdateProject) => {
  const res = await apiModule.post(`/mx-project/update`, params);

  return res;
};

const updateProjectServices = {
  updateMxProject: updateMxProject
};

export default updateProjectServices;
