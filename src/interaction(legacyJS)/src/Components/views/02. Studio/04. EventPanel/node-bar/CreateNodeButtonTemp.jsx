import { observer } from "mobx-react-lite";
import storeContainer from "../../../../stores/storeContainer";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CreateNodeCommand from "../../../../class/commands/Interaction/CreateNodeCommand";

const CreateNodeButtonTemp = observer((props) => {
  const { eventSystem_store, interactionhistory_store, string_store } =
    storeContainer;
  const { type, Icon, labelKey, width = "50px", height = "60px" } = props;
  return (
    <IconButton
      onClick={() => {
        interactionhistory_store.execute(
          new CreateNodeCommand(eventSystem_store, {
            type: type,
            sheetId: eventSystem_store.selectedSheet,
          })
        );
      }}
      sx={{
        padding: "0px",
        width: { width },
        height: { height },
        borderRadius: 2,
        color: "#BBBBBB",
        "&:hover": {
          color: "#BBBB00",
          backgroundColor: "#444444",
        },
      }}
    >
      <div>
        <Icon
          sx={{
            marginTop: "0.2em",
          }}
        />
        <Box fontWeight="bold" fontSize="0.1em">
          {labelKey && string_store.string(labelKey)}
        </Box>
      </div>
    </IconButton>
  );
});

export default CreateNodeButtonTemp;
