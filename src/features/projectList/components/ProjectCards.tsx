import { useState } from "react";
import { ProjectCard } from "./card/ProjectCard";
import { AddCard } from "./card/AddCard";
import { StyledGrid } from "./projectList.styles";
import { Project, ProjectList } from "../types/project";

type Props = {
  projects: ProjectList<Project>;
};

export const ProjectCards = ({ projects }: Props) => {
  const [selectedCompIdx, setSelectedCompIdx] = useState<number>(-2);
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
