interface RequestRegisterPrefab {
  id: string;
  name: string;
  fileName: string;
  type: string;
  domain: string;
  majorCategories: string[];
  minorCategories: string[];
  createdAt: string;
  author: string;
}

interface RequestRegisterAsset {
  id: string;
  name: string;
  fileName: string;
  type: string;
  domain: string;
  majorCategories: string[];
  minorCategories: string[];
  createdAt: string;
  author: string;
}

export type { RequestRegisterPrefab, RequestRegisterAsset };
