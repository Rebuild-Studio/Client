interface ResponseMyProject {
  id: string;
  name: string;
  url: string;
  thumbnail: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface RequestMySpecificProject {
  projectId: string;
}

interface ResponseMySpecificProject {
  id: string;
  name: string;
  url: string;
  thumbnail: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export type {
  ResponseMyProject,
  RequestMySpecificProject,
  ResponseMySpecificProject
};
