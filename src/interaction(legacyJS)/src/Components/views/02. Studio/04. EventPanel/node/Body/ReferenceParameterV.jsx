import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import storeContainer from "../../../../../stores/storeContainer";
import { Box, Typography } from "@mui/material";
import NodeReferenceSelector from "./NodeReferenceSelector_V";

/**
 * A React component for displaying reference parameters.
 *
 * @function
 * @param {Object} props - The component props.
 * @param {Object} props.reference - The reference object containing the name and other details.
 * @returns {React.Element} The rendered component.
 */

const ReferenceParameterV = observer(({ reference }) => {
  const { t } = useTranslation();
  const { eventSystem_store } = storeContainer;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#393939",
        paddingLeft: `${8 * 2 * eventSystem_store.cameraZoom}px`,
        paddingRight: `${8 * 2 * eventSystem_store.cameraZoom}px`,
        lineHeight: `${30 * eventSystem_store.cameraZoom}px`,
      }}
      data-name="node"
      data-output="true"
    >
      <Typography
        sx={{
          verticalAlign: "center",
          textAlign: "start",
          display: "inline-block",
          fontFamily: "sans-serif",
          fontSize: "inherit",
          lineHeight: `${30 * eventSystem_store.cameraZoom}px`,
          color: "#fff",
        }}
        data-name="node"
      >
        {eventSystem_store.cameraZoom > 0.5 && t(reference.name)}
      </Typography>{" "}
      <NodeReferenceSelector reference={reference} />
    </Box>
  );
});
export default ReferenceParameterV;
