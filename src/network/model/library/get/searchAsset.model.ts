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

export type { RequestSearchAsset, ResponseSearchAsset };
