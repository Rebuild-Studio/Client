import { observer } from "mobx-react";
import ContextMenu from "./ContextMenu";
import storeContainer from "../../../../stores/storeContainer";
import DeleteNodeAndGroupCommand from "../../../../class/commands/Interaction/DeleteNodeAndGroupCommand";
import CloneNodeAndGroupCommand from "../../../../class/commands/Interaction/CloneNodeAndGroupCommand";
import SelectNodeAndGroupCommand from "../../../../class/commands/Interaction/SelectNodeAndGroupCommand";
import CreateGroupCommand from "../../../../class/commands/Interaction/CreateGroupCommand";

const PanelContextMenu = observer(() => {
  const { eventSystem_store, interactionhistory_store } = storeContainer;
  const sheet = eventSystem_store.getSelectedSheet();
  const handleClickCopy = () => {
    sheet.addCopiedNodesAndGroups();
  };
  const handleClickPaste = () => {
    if (!sheet.checkReference(sheet.copiedGroups, sheet.copiedNodes)) return;
    interactionhistory_store.execute(
      new CloneNodeAndGroupCommand(
        eventSystem_store,
        sheet.uuid,
        sheet.copiedNodes,
        sheet.copiedGroups
      )
    );
  };
  const handleClickUnselect = () => {
    interactionhistory_store.execute(
      new SelectNodeAndGroupCommand(
        eventSystem_store,
        undefined,
        true,
        true,
        sheet.uuid
      )
    );
  };
  const handleClickGroup = () => {
    interactionhistory_store.execute(
      new CreateGroupCommand(eventSystem_store, sheet.uuid, sheet.selectedNodes)
    );
  };
  const handleClickDelete = () => {
    interactionhistory_store.execute(
      new DeleteNodeAndGroupCommand(
        eventSystem_store,
        sheet.uuid,
        sheet.selectedGroups,
        sheet.selectedNodes
      )
    );
  };
  const generalItems = [
    {
      stringKey: "Copy",
      onClick: handleClickCopy,
      disabled: sheet.selectedNodes.length + sheet.selectedGroups.length === 0,
    },
    {
      stringKey: "Paste",
      onClick: handleClickPaste,
      disabled: sheet.copiedNodes.length + sheet.copiedGroups.length === 0,
    },
    {
      stringKey: "Delete",
      onClick: handleClickDelete,
      disabled: sheet.selectedNodes.length + sheet.selectedGroups.length === 0,
    },
  ];
  const selectItems = [
    {
      stringKey: "Unselect",
      onClick: handleClickUnselect,
      disabled: sheet.selectedNodes.length + sheet.selectedGroups.length === 0,
    },
  ];
  const groupItems = [
    {
      stringKey: "Group",
      onClick: handleClickGroup,
      disabled:
        eventSystem_store.selectedGroups.length > 0
          ? true
          : eventSystem_store.selectedNodes.some((uuid) =>
              eventSystem_store.getSelectedSheet().getGroupOfNodeOrGroup(uuid)
                ? true
                : false
            ),
      isDivided: true,
    },
  ];
  return (
    <ContextMenu type="Panel" items={[generalItems, selectItems, groupItems]} />
  );
});

export default PanelContextMenu;
