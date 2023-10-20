import { useEffect, useState } from "react";
import { ProjectCard } from "./card/ProjectCard";
import { AddCard } from "./card/AddCard";
import { StyledGrid } from "./projectList.styles";
import { Project, ProjectList } from "../types/project";
import storeContainer from "@/store/storeContainer";
import { ProjectInfo } from "@/store/projectStore";

type Props = {
  projects: ProjectList<Project>;
};

export const ProjectCards = ({ projects }: Props) => {
  const [selectedCompIdx, setSelectedCompIdx] = useState<number>(-2);
  const { projectStore } = storeContainer;

  useEffect(() => {
    if (selectedCompIdx < 0) return;
    const selectedProject: ProjectInfo = {
      projectId: projects[selectedCompIdx].id,
      projectName: projects[selectedCompIdx].name,
      projectType: 'MX',
      thumbnail: projects[selectedCompIdx].thumbnail,
    };
    projectStore.setSelectedProject(selectedProject);

    return () => {
      projectStore.clearSelectedProject();
    }
  }, [selectedCompIdx, projectStore, projects])

  return (
    <StyledGrid>
      <AddCard
        isClicked={selectedCompIdx === -1 ? true : false}
        onClick={() => {
          setSelectedCompIdx(-1);
        }}
      />
      {projects.map((props, idx) => (
        <ProjectCard
          {...props}
          key={props.id}
          onClick={() => {
            setSelectedCompIdx(idx);
          }}
          isClicked={selectedCompIdx === idx ? true : false}
        />
      ))}
    </StyledGrid>
  );
};