import apiModule from '@/network/module/apiModule';
import { RequestSpecificProject } from './models/DeleteProjectModels';

const deleteProject = async () => {
  const res = await apiModule.delete('/project');

  return res;
};

const deleteSpecificProject = async (params: RequestSpecificProject) => {
  const res = await apiModule.delete(`/project/${params.projectId}`);

  return res;
};

const deleteProjectServices = {
  deleteProject: deleteProject,
  deleteSpecificProject: deleteSpecificProject
};

export default deleteProjectServices;
