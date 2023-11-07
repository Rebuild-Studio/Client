import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  RequestGetAssetList,
  ResponseGetAssetList
} from '@/network/model/library/get/getAssetList.model';
import getLibraryServices from '@/network/restApi/services/library/get/getLibraryServices';
import { LibraryAsset } from '../types/fetchAssetType';

const assetDataMapper = (data: ResponseGetAssetList) => {
  const mappedData: LibraryAsset[] = data.map((asset) => {
    return {
      id: asset.id,
      name: asset.name,
      fileName: asset.fileName,
      type: 'asset',
      domain: asset.domain,
      createdAt: asset.createdAt,
      author: asset.author
    };
  });
  return mappedData;
};

export const useFetchLibraryAssets = (queryParam: RequestGetAssetList) => {
  const query = useQuery({
    queryKey: ['libraryAssets', queryParam],
    queryFn: () =>
      getLibraryServices
        .getAssets(queryParam)
        .then((res) => assetDataMapper(res)),
    keepPreviousData: true
  });
  useEffect(() => {
    query.isError && alert('에셋 로딩중 에러가 발생했습니다.');
  }, [query.isError]);
  return query;
};
