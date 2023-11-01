import { useCallback, useState } from 'react';
import getProjectServices from '@/network/webSocket/services/project/get/getProjectServices';
import { RequestGetMxProject } from '@/network/webSocket/services/project/get/model/getMxProject.model';
import { RequestGetPmxProject } from '@/network/webSocket/services/project/get/model/getPmxProject.model';
import storeContainer from '@/store/storeContainer';
import { ProjectType } from '@store/project.store.ts';

const GET_PROJECT_SERVICE = {
  MX: (reqParam: RequestGetMxProject) =>
    getProjectServices.getMxProject({ mxId: reqParam.mxId }),
  PMX: (reqParam: RequestGetPmxProject) =>
    getProjectServices.getPmxProject({ pmxId: reqParam.pmxId })
};

type UseFetchProject = [string, () => Promise<void>];

export const useFetchProject = (projectType: ProjectType): UseFetchProject => {
  const { projectStore } = storeContainer;
  const [error, setError] = useState<string>('');

  const fetchProject = useCallback(async () => {
    try {
      const reqParam: RequestGetMxProject & RequestGetPmxProject = {
        mxId: projectStore.projectId,
        pmxId: projectStore.projectId // add pmxId to the request parameters
      };
      const res = await GET_PROJECT_SERVICE[projectType](reqParam);
      if (!res) {
        // fix problem 1
        throw new Error('프로젝트를 불러오는데 실패했습니다.');
      }
      projectStore.setMxJson(res);
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
