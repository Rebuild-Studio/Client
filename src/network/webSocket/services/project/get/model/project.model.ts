import { MxJson } from '@/types/mxJson/mxJson';

/**
 * @description 실제 프로젝트 호출 시 사용되는 인터페이스
 */
type Project = MxJson;

interface ProjectListData {
  thumbnail: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * @description 프로젝트 리스트 조회 시 사용되는 인터페이스
 */
interface MxProjectListData extends ProjectListData {
  mxId: string;
  mxName: string;
}

interface PmxProjectListData extends ProjectListData {
  pmxId: string;
  pmxName: string;
}

type ProjectList<T extends ProjectListData> = T[];

export type { Project, ProjectList, MxProjectListData, PmxProjectListData };
