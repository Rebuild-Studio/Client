interface Project {
  id: string;
  name: string;
  thumbnail: string;
  savedAt: string;
}

interface Template extends Project {
  type: 'template';
}

type ProjectList<T extends Project> = T[];

export type { Project, Template, ProjectList };
