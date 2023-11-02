import {
  MxProjectListData,
  ProjectList,
  RequestGetProjectList
} from './project.model';

interface RequestGetMxProjectList extends RequestGetProjectList {}

interface ResponseGetMxProjectList extends ProjectList<MxProjectListData> {}

export type { RequestGetMxProjectList, ResponseGetMxProjectList };
