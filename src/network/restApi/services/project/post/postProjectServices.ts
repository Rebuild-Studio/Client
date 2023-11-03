import { CommonResponse } from '@/network/model/common/response.model';
import {
  RequestCreateMxProject,
  ResponseCreateMxProject
} from '@/network/model/project/post/postMxProject.model';
import {
  RequestCreatePmxProject,
  ResponseCreatePmxProject
} from '@/network/model/project/post/postPmxProject.model';
import apiModule from '@/network/module/apiModule';

const createMxProject = async (params: RequestCreateMxProject) => {
  const res = await apiModule
    .post<CommonResponse<ResponseCreateMxProject>>('/mx-project/create', params)
    .catch((e) => {
      console.error('PMX 생성 실패 : ', e);
    });
  if (!res?.data) throw new Error('no data');
  return res.data.result;
};

const createPmxProject = async (params: RequestCreatePmxProject) => {
  const res = await apiModule
    .post<CommonResponse<ResponseCreatePmxProject>>(
      '/pmx-project/create',
      params
    )
    .catch((e) => {
      console.error('PMX 생성 실패 : ', e);
    });
  if (!res?.data) throw new Error('no data');
  return res.data.result;
};

const postProjectServices = {
  createMxProject,
  createPmxProject
};

export default postProjectServices;
