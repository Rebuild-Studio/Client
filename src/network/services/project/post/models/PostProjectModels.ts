interface RequestUploadProject {
  id: string;
  userId: string;
  thumbnailUrl: string;
  jsonUrl: string;
  name: string;
  json: UploadProjectJson;
  thumbnail: string;
}

interface UploadProjectJson {
  key1: string;
  key2: number;
}

interface RequestSearchProject {
  keyword: string;
  offset: number;
}

export type { RequestUploadProject, RequestSearchProject };
