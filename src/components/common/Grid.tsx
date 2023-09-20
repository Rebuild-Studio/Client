import React from "react";
import styled from "styled-components";

const GridContainer = styled.div<{ columns: number }>`
  width: 100%;
  display: grid;
  grid-template-columns: ${(props) =>
    `repeat(${props.columns}, minmax(10px, auto))`};
  gap: 20px;
`;

const GridItem = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  border: 1px solid #ccc;
`;

const Grid = ({
  items,
  columns,
}: {
  items: React.ReactNode[];
  columns: number;
}) => {
  return (
    <GridContainer columns={columns}>
      {items.map((item, index) => (
        <GridItem key={index}>
          <h2>열 {index + 1}</h2>
          <p>{item}</p>
        </GridItem>
      ))}
    </GridContainer>
  );
};

export default Grid;
