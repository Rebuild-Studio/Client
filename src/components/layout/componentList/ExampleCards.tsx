import { useState } from "react";
import { AddCard } from "./card/AddCard";
import { ExampleCard, ExampleCardProps } from "./card/ExampleCard";
import { StyledGrid } from "./componentList.Styles";

type Props = {
  componentData: ExampleCardProps[];
};

export const ExampleCards = ({ componentData }: Props) => {
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
