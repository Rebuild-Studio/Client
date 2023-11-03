import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ResponseGetMxProjectList } from '@/network/model/project/get/getMxProjectList.model';
import { Project, ProjectList } from '../types/project';

const { default: getProjectServices } = await import(
  `../../../network/${
    import.meta.env.VITE_NETWORK_TYPE
  }/services/project/get/getProjectServices.ts`
);

const projectListDataMapper = (data: ResponseGetMxProjectList) => {
  const mappedData: ProjectList<Project> = data.map((project) => {
    return {
      id: project.mxId,
      name: project.mxName,
      thumbnail: project.thumbnail,
      savedAt: project.updatedAt
    };
  });
  return mappedData;
};

interface ProjectListInterface {
  page: number;
  onError?: (error: unknown) => void;
}
export const useFetchProjectList = ({
  page,
  onError
}: ProjectListInterface) => {
  const query = useQuery({
    queryKey: ['projectList', page],
    queryFn: () =>
      getProjectServices
        .getMyMxProjectList({
          page: page
        })
        .then((res: ResponseGetMxProjectList) => projectListDataMapper(res)),
    keepPreviousData: true
  });
  useEffect(() => {
    if (query.isError && onError) onError(query.error);
  }, [query.error, query.isError]);

  return query;
};
