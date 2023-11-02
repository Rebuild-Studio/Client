import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import getProjectServices from '@/network/webSocket/services/project/get/getProjectServices';
import { ResponseGetMxProjectList } from '@/network/webSocket/services/project/get/model/getMxProjectList.model';
import { Project, ProjectList } from '../types/project';

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
        .then((res) => projectListDataMapper(res)),
    keepPreviousData: true
  });
  useEffect(() => {
    if (query.isError && onError) onError(query.error);
  }, [query.error, query.isError]);

  return query;
};
