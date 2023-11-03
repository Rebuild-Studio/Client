import {
  RequestCreateMxProject,
  ResponseCreateMxProject
} from '@/network/model/project/post/postMxProject.model';

interface PostProjectServices {
  createMxProject: (
    params: RequestCreateMxProject
  ) => Promise<ResponseCreateMxProject>;
  createPmxProject: (
    params: RequestCreateMxProject
  ) => Promise<ResponseCreateMxProject>;
}

export default PostProjectServices;
