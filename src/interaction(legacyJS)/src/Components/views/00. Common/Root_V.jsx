import { Box } from "@mui/material";
import TopBar from "./TopBar_V";
import { observer } from "mobx-react-lite";
import React from "react";
import InteractionPanel from "../02. Studio/04. EventPanel/InteractionPanel";

/**
 * A React component for displaying the root view.
 * InteractionPanel is hidden when current page shows interactionEditor
 * Both MainPanel and InteractionPanel does not render again
 */

const Root_V = observer(() => {
  return (
    <>
      <Box sx={{ width: "100vw", height: "80vh" }}>
        <InteractionPanel />
        <TopBar />
      </Box>
    </>
  );
});

export default Root_V;
