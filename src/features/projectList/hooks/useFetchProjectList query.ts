import getProjectServices from "@/network/services/project/get/getProjectServices";
import { ResponseGetMxProjectList } from "@/network/services/project/get/models/getMxProjectList.model";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Project, ProjectList } from "../types/project";

const projectListDataMapper = (data: ResponseGetMxProjectList) => {
  const mappedData: ProjectList<Project> = data.result.map((project) => {
    return {
      id: project.mxId,
      name: project.mxName,
      thumbnail: project.thumbnail,
      savedAt: project.updatedAt,
    };
  });
  return mappedData;
};

export const useFetchProjectList = () => {
  const query = useQuery({
    queryKey: ["projectList"],
    queryFn: () =>
      getProjectServices
        .getMyMxProjectList()
        .then((res) => projectListDataMapper(res)),
    keepPreviousData: true,
  });
  useEffect(() => {
    query.error && console.error("프로젝트 리스트 조회 실패 : ", query.error);
  }, [query.error]);
  return query;
};
