import { DomainType } from "@/features/assetLibrary/constants/domain";

interface FetchAssetType {
  id: string;
  name: string;
  fileName: string;
  type: "asset";
  domain: DomainType;
  createdAt: string;
  author: string;
}

export type { FetchAssetType };
