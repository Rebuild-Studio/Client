import React from "react";
import styled from "styled-components";

const Grid = ({
  item,
  columns,
}: {
  item: React.ReactNode;
  columns: number;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
}) => {
  return <GridContainer columns={columns}>{item}</GridContainer>;
};

export default Grid;

const GridContainer = styled.div<{ columns: number }>`
  width: 100%;
  display: grid;
  justify-content: center;
  grid-template-columns: ${(props) =>
    `repeat(${props.columns}, minmax(10px, auto))`};
  gap: 20px;
`;
