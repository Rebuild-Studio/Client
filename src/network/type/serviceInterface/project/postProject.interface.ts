import {
  RequestCreateMxProject,
  ResponseCreateMxProject
} from '@/network/model/project/post/postMxProject.model';
import {
  RequestCreatePmxProject,
  ResponseCreatePmxProject
} from '@/network/model/project/post/postPmxProject.model';

interface PostProjectServices {
  createMxProject: (
    params: RequestCreateMxProject
  ) => Promise<ResponseCreateMxProject>;
  createPmxProject?: (
    params: RequestCreatePmxProject
  ) => Promise<ResponseCreatePmxProject>;
}

export default PostProjectServices;
