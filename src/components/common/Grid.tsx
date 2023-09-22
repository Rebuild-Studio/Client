import React from "react";
import styled from "styled-components";

const GridContainer = styled.div<{ columns: number }>`
  width: 100%;
  display: grid;
  grid-template-columns: ${(props) =>
    `repeat(${props.columns}, minmax(10px, auto))`};
  gap: 20px;
`;

const Grid = ({
  items,
  columns,
}: {
  items: React.ReactNode;
  columns: number;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
}) => {
  return <GridContainer columns={columns}>{items}</GridContainer>;
};

export default Grid;
