import { AppBar, Box } from "@mui/material"; // fixme: 해당 import 지우면 에러 (createTheme_default is not a function at Box.js:8:22)
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
