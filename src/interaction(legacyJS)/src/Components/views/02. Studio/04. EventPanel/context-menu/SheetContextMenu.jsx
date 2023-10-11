import Menu from "@mui/material/Menu";
import { observer } from "mobx-react";
import storeContainer from "../../../../stores/storeContainer";
import ContextMenuItem from "../views/ContextMenuItem";
import DeleteSheetCommand from "../../../../class/commands/Interaction/DeleteSheetCommand";

const SheetContextMenu = observer(() => {
  const { eventSystem_store, interactionhistory_store } = storeContainer;
  const position = eventSystem_store.contextMenuPosition;
  const handleClose = () => {
    eventSystem_store.closeContextMenu();
  };

  const handleClickDelete = () => {
    interactionhistory_store.execute(
      new DeleteSheetCommand(eventSystem_store, eventSystem_store.selectedSheet)
    );
    handleClose();
  };

  const onBackdropContextMenu = (event) => {
    event.preventDefault();
    handleClose();
  };
  const items = [
    {
      stringKey: "Delete",
      onClick: handleClickDelete,
    },
  ];
  return (
    <Menu
      open={eventSystem_store.contextMenuType === "Sheet"}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={{ top: position[1], left: position[0] }}
      BackdropProps={{
        invisible: true,
        onContextMenu: onBackdropContextMenu,
      }}
    >
      {items.map((item) => {
        return (
          <ContextMenuItem
            key={`SheetContextMenu ${item.stringKey}`}
            disabled={Object.values(eventSystem_store.sheets).length < 2}
            onClick={item.onClick}
          >
            {item.stringKey}
          </ContextMenuItem>
        );
      })}
    </Menu>
  );
});

export default SheetContextMenu;
