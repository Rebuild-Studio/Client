import { AppBar, Box } from "@mui/material";
import React from "react";
import { observer } from "mobx-react-lite";
import TopBarEvent from "./Interaction/TopBarInteraction";

const TopBar = observer(() => {
  return (
    <Box sx={style.wrapper}>
      <AppBar
        sx={style.appBar}
        onDragStart={(e) => {
          e.preventDefault();
        }}
      >
        <TopBarEvent />
      </AppBar>
    </Box>
  );
});
export default TopBar;

const style = {
  wrapper: {
    width: "100%",
    height: "78px",
  },

  appBar: {
    width: "100%",
    boxShadow: 0,
    overflow: "hidden",
    display: "flex",
    justifyContent: "flex-start",
    backgroundColor: "transparent",
    userSelect: "none",
  },
};
