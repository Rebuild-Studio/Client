interface Project {
  id: string;
  projectName: string;
  thumbnail: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

type ProjectList<T extends Project> = T[];

export type { Project, ProjectList };
