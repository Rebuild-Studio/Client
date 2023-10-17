import { useState } from "react";
import { AddCard } from "./card/AddCard";
import { ProjectCard, ProjectCardProps } from "./card/ProjectCard";
import { StyledGrid } from "./componentList.Styles";

type Props = {
  componentData: ProjectCardProps[];
};

export const ProjectCards = ({ componentData }: Props) => {
  const [selectedCompIdx, setSelectedCompIdx] = useState<number>(-2);
  return (
    <StyledGrid>
      <AddCard
        isClicked={selectedCompIdx === -1 ? true : false}
        onClick={() => {
          setSelectedCompIdx(-1);
        }}
      />
      {componentData.map((props, idx) => (
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
