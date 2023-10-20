import { AppBar, Box } from "@mui/material"; // 지우면 에러..
import React from "react";
import { observer } from "mobx-react";
import TopBarEvent from "./Interaction/TopBarInteraction";
import styled from "styled-components";

const TopBar = observer(() => {
  return (
    <Wrapper
      onDragStart={(e) => {
        e.preventDefault();
      }}
    >
      <TopBarEvent />
    </Wrapper>
  );
});
export default TopBar;

const Wrapper = styled.div`
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;
