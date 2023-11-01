interface RequestUploadAsset {
  file: Blob;
  fileName: string;
}

interface ResponseUploadAsset {
  success: boolean;
  id: string;
  url: string;
  createdAt: string;
  size: number;
}

export type { RequestUploadAsset, ResponseUploadAsset };
