import apiModule from '@/network/module/apiModule';
import {
  RequestCreateMxProject,
  ResponseCreateMxProject
} from './models/postMxProject.model';
import {
  RequestCreatePmxProject,
  ResponseCreatePmxProject
} from './models/postPmxProject.model';

const createMxProject = async (params: RequestCreateMxProject) => {
  const res = await apiModule
    .post<ResponseCreateMxProject>('/mx-project/create', params)
    .catch((e) => {
      console.error('PMX 생성 실패 : ', e);
    });
  if (!res?.data) throw new Error('no data');
  return res.data;
};

const createPmxProject = async (params: RequestCreatePmxProject) => {
  const res = await apiModule
    .post<ResponseCreatePmxProject>('/pmx-project/create', params)
    .catch((e) => {
      console.error('PMX 생성 실패 : ', e);
    });
  if (!res?.data) throw new Error('no data');
  return res.data;
};

const postProjectServices = {
  createMxProject: createMxProject,
  createPmxProject: createPmxProject
};

export default postProjectServices;
