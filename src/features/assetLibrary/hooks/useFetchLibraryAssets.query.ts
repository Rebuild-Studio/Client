import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import getLibraryServices from '@/network/webSocket/services/library/get/getLibraryServices';
import {
  RequestGetAsset,
  ResponseGetAsset
} from '@/network/webSocket/services/library/get/models/getLibrary.models';
import { LibraryAsset } from '../types/fetchAssetType';

const assetDataMapper = (data: ResponseGetAsset[]) => {
  const mappedData: LibraryAsset[] = data.map((asset) => {
    return {
      id: asset.id,
      name: asset.name,
      fileName: asset.filename,
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
