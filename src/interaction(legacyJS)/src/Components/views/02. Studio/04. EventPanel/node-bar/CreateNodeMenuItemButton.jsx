import { observer } from "mobx-react-lite";
import MenuItem from "@mui/material/MenuItem";
import storeContainer from "../../../../stores/storeContainer";
import CreateNodeCommand from "../../../../class/commands/Interaction/CreateNodeCommand";

const CreateNodeMenuItemButton = ({ node, labelKey, closer }) => {
  const { eventSystem_store, interactionhistory_store, string_store } =
    storeContainer;

  return (
    <MenuItem
      onClick={() => {
        closer();
        interactionhistory_store.execute(
          new CreateNodeCommand(eventSystem_store, {
            node: node,
            sheetId: eventSystem_store.selectedSheet,
          })
        );
      }}
    >
      {string_store.string(labelKey)}
    </MenuItem>
  );
};

export default observer(CreateNodeMenuItemButton);
