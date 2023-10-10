import getLibraryServices from "@/network/services/library/get/getLibraryServices";
import { RequestGetAsset } from "@/network/services/library/get/models/GetLibraryModels";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useFetchLibraryAssets = (queryParam: RequestGetAsset) => {
  const query = useQuery({
    queryKey: ["libraryAssets", queryParam],
    queryFn: () => getLibraryServices.getAssets(queryParam),
    keepPreviousData: true,
  });
  useEffect(() => {
    query.isError && alert("에셋 로딩중 에러가 발생했습니다.");
  }, [query.isError]);
  return query;
};
