import { MxJson } from '@/types/mxJson/mxJson';

/**
 * @description 실제 프로젝트 호출 시 사용되는 인터페이스
 */
interface Project {
  id: string;
  projectName: string;
  mxJson: MxJson;
}

/**
 * @description 프로젝트 리스트 조회 시 사용되는 인터페이스
 */
interface ProjectInfo {
  mxId: string; //TODO : mx pmx 모델 분리
  mxName: string;
  thumbnail: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

type ProjectList<T extends ProjectInfo> = { result: T[] };

export type { Project, ProjectInfo, ProjectList };
