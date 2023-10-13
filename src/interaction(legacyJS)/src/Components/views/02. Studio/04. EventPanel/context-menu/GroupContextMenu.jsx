import { observer } from "mobx-react";
import storeContainer from "../../../../stores/storeContainer";
import MergeGroupCommand from "../../../../class/commands/Interaction/MergeGroupCommand";
import UngroupCommand from "../../../../class/commands/Interaction/UngroupCommand";
import CloneNodeAndGroupCommand from "../../../../class/commands/Interaction/CloneNodeAndGroupCommand";
import DeleteNodeAndGroupCommand from "../../../../class/commands/Interaction/DeleteNodeAndGroupCommand";
import ContextMenu from "./ContextMenu";

const GroupContextMenu = observer(() => {
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
  const handleClickUngroup = () => {
    interactionhistory_store.execute(
      new UngroupCommand(eventSystem_store, sheet.uuid, sheet.selectedGroups)
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
  const handleClickMerge = () => {
    interactionhistory_store.execute(
      new MergeGroupCommand(
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
    },
    {
      stringKey: "Paste",
      onClick: handleClickPaste,
    },
    {
      stringKey: "Delete",
      onClick: handleClickDelete,
    },
  ];
  const groupItems = [
    {
      stringKey: "Ungroup",
      onClick: handleClickUngroup,
    },
    {
      stringKey: "Merge",
      onClick: handleClickMerge,
      disabled:
        sheet.selectedGroups.length === 1
          ? !sheet.selectedNodes.some(
              (node) =>
                sheet.getGroupOfNodeOrGroup(node) !== sheet.selectedGroups[0]
            )
          : false,
    },
  ];

  return <ContextMenu type="Group" items={[generalItems, groupItems]} />;
});

export default GroupContextMenu;
