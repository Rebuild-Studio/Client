import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import getLibraryServices from '@/network/services/library/get/getLibraryServices';
import {
  RequestGetAsset,
  ResponseGetAsset
} from '@/network/services/library/get/models/GetLibraryModels';
import { LibraryAsset } from '../types/fetchAssetType';

const assetDataMapper = (data: ResponseGetAsset[]) => {
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

export const useFetchLibraryAssets = (queryParam: RequestGetAsset) => {
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
