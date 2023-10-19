interface Project {
  id: string;
  mxName: string;
  thumbnail: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

type ProjectList<T extends Project> = { result: T[] };

export type { Project, ProjectList };
