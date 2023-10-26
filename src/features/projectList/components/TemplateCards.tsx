import { useState } from 'react';
import { ExampleCard } from './card/ExampleCard';
import { AddCard } from './card/AddCard';
import { StyledGrid } from './projectList.styles';
import { ProjectList, Template } from '../types/project';

type Props = {
  projects: ProjectList<Template>;
};

export const TemplateCards = ({ projects }: Props) => {
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
        <ExampleCard
          {...props}
          key={props.name}
          onClick={() => {
            setSelectedCompIdx(idx);
          }}
          isClicked={selectedCompIdx === idx ? true : false}
        />
      ))}
    </StyledGrid>
  );
};
