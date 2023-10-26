import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import getProjectServices from '@/network/services/project/get/getProjectServices';
import { ResponseGetMxProjectList } from '@/network/services/project/get/models/getMxProjectList.model';
import { Project, ProjectList } from '../types/project';

const projectListDataMapper = (data: ResponseGetMxProjectList) => {
  const mappedData: ProjectList<Project> = data.result.map((project) => {
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
  onError?: (error: unknown) => void;
}
export const useFetchProjectList = ({ onError }: ProjectListInterface) => {
  const query = useQuery({
    queryKey: ['projectList'],
    queryFn: () =>
      getProjectServices
        .getMyMxProjectList()
        .then((res) => projectListDataMapper(res)),
    keepPreviousData: true
  });
  useEffect(() => {
    if (query.isError && onError) onError(query.error);
  }, [query.error, query.isError]);

  return query;
};
