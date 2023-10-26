import { useCallback, useState } from 'react';
import getProjectServices from '@/network/services/project/get/getProjectServices';
import { RequestGetMxProject } from '@/network/services/project/get/models/getMxProject.model';
import { RequestGetPmxProject } from '@/network/services/project/get/models/getPmxProject.model';
import { ProjectType } from '@/store/projectStore';
import storeContainer from '@/store/storeContainer';

const GET_PROJECT_SERVICE = {
  MX: (reqParam: RequestGetMxProject) =>
    getProjectServices.getMxProject(reqParam),
  PMX: (reqParam: RequestGetPmxProject) =>
    getProjectServices.getPmxProject(reqParam)
};

type UseFetchProject = [string, () => Promise<void>];

export const useFetchProject = (projectType: ProjectType): UseFetchProject => {
  const { projectStore } = storeContainer;
  const [error, setError] = useState<string>('');

  const fetchProject = useCallback(async () => {
    const reqParam: RequestGetMxProject = {
      projectId: projectStore.projectId
    };
    try {
      const res = await GET_PROJECT_SERVICE[projectType](reqParam);
      if (!res?.data.result) {
        throw new Error('프로젝트를 불러오는데 실패했습니다.');
      }
      projectStore.setMxJson(res.data.result.mxJson);
    } catch (e: unknown) {
      // api에러 핸들링은 훅에서 하고, 컴포넌트에서는 toast로 내보내기
      if (e instanceof Error) {
        e?.message && setError(e.message);
      } else {
        setError('알 수 없는 에러가 발생했습니다.');
      }
    }
  }, [projectStore, projectType]);

  return [error, fetchProject];
};
