import { Box } from "@mui/material";
import { observer } from "mobx-react";
import { common_store } from "../../../../stores/Common_Store";
import InteractionHistoryList from "./interactionHistoryList";
import InteractionHierarchyList from "./interactionHierarchyList";

const InteractionLeftTab = observer((props) => {
  const { children, value, index, ...other } = props;

  return (
    <Box
      sx={{
        width: "253px",
      }}
      hidden={value !== index}
      {...other}
    >
      {value === 1 && common_store.optionLeftTab === "history" && (
        <InteractionHistoryList />
      )}
      {value === 1 && common_store.optionLeftTab === "hierarchy" && (
        <InteractionHierarchyList />
      )}
    </Box>
  );
});

export default InteractionLeftTab;
