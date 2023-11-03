import { DomainType } from '@/features/assetLibrary/constants/domain';

interface RequestGetAssetList {
  domain: string;
  majorCategory: string;
  minorCategory: string;
  page: number;
}

interface AssetInfo {
  id: string;
  name: string;
  fileName: string;
  type: string;
  domain: DomainType;
  createdAt: string;
  author: string;
}

type ResponseGetAssetList = AssetInfo[];

export type { RequestGetAssetList, ResponseGetAssetList };
