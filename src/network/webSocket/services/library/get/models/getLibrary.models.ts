import { DomainType } from '@/features/assetLibrary/constants/domain';

interface RequestGetAsset {
  domain: string;
  majorCategory: string;
  minorCategory: string;
  page: number;
}

// 배열로 React Query에서 사용해야 함
interface ResponseGetAsset {
  id: string;
  name: string;
  filename: string;
  type: string;
  domain: DomainType;
  createdAt: string;
  author: string;
}

interface RequestSearchAsset {
  searchString: string;
}

// 배열로 React Query에서 사용해야 함
interface ResponseSearchAsset {
  libraryId: string;
  name: string;
  fileName: string;
  type: string;
  domain: string;
  majorCategories: string[];
  minorCategories: string[];
  createdAt: string;
  author: string;
}

export type {
  RequestGetAsset,
  ResponseGetAsset,
  RequestSearchAsset,
  ResponseSearchAsset
};
