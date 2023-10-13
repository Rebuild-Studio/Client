import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import storeContainer from "../../../../stores/storeContainer";
import DeleteNodeAndGroupCommand from "../../../../class/commands/Interaction/DeleteNodeAndGroupCommand";
import CloneNodeAndGroupCommand from "../../../../class/commands/Interaction/CloneNodeAndGroupCommand";
import CreateGroupCommand from "../../../../class/commands/Interaction/CreateGroupCommand";
import SelectNodeAndGroupCommand from "../../../../class/commands/Interaction/SelectNodeAndGroupCommand";

//RootVKeyboardEvent
//domElement : RootV domElement
//키 입력에 따라 커맨드 호출
const RootVKeyboardEvent = observer((props) => {
  const { eventSystem_store, interactionhistory_store } = storeContainer;
  const { domElement } = props;

  useEffect(() => {
    if (!domElement) {
      return;
    }
    const onKeyDown = (event) => {
      // event.stopPropagation();
      if (
        event.key === "Delete" &&
        eventSystem_store.selectedGroups.length +
          eventSystem_store.selectedNodes.length >
          0
      ) {
        interactionhistory_store.execute(
          new DeleteNodeAndGroupCommand(
            eventSystem_store,
            eventSystem_store.selectedSheet,
            eventSystem_store.selectedGroups,
            eventSystem_store.selectedNodes
          )
        );
      } else if (event.code === "Space") {
        eventSystem_store.getSelectedSheet().focusSelected();
      } else if (event.code === "Escape") {
        if (
          eventSystem_store.selectedNodes.length +
            eventSystem_store.selectedGroups.length >
          0
        )
          interactionhistory_store.execute(
            new SelectNodeAndGroupCommand(
              eventSystem_store,
              undefined,
              true,
              true,
              eventSystem_store.selectedSheet
            )
          );
      } else if (event.ctrlKey || event.metaKey) {
        if (event.code === "KeyC") {
          eventSystem_store.getSelectedSheet().addCopiedNodesAndGroups();
        } else if (
          event.code === "KeyV" &&
          eventSystem_store.copiedNodes.length +
            eventSystem_store.getSelectedSheet().copiedGroups.length >
            0
        ) {
          if (
            !eventSystem_store
              .getSelectedSheet()
              .checkReference(
                eventSystem_store.getSelectedSheet().copiedGroups,
                eventSystem_store.getSelectedSheet().copiedNodes
              )
          )
            return;
          interactionhistory_store.execute(
            new CloneNodeAndGroupCommand(
              eventSystem_store,
              eventSystem_store.selectedSheet,
              eventSystem_store.getSelectedSheet().copiedNodes,
              eventSystem_store.getSelectedSheet().copiedGroups
            )
          );
        } else if (event.code === "KeyG") {
          event.preventDefault();
          if (
            eventSystem_store.selectedNodes.some((uuid) =>
              eventSystem_store.getSelectedSheet().getGroupOfNodeOrGroup(uuid)
                ? true
                : false
            )
          )
            return;
          if (eventSystem_store.selectedGroups.length)
            interactionhistory_store.execute(
              new DeleteNodeAndGroupCommand(
                eventSystem_store,
                eventSystem_store.getSelectedSheet().uuid,
                eventSystem_store.getSelectedSheet().selectedGroups,
                eventSystem_store.getSelectedSheet().selectedNodes
              )
            );
          else
            interactionhistory_store.execute(
              new CreateGroupCommand(
                eventSystem_store,
                eventSystem_store.selectedSheet,
                eventSystem_store.selectedNodes
              )
            );
        } else if (event.code === "KeyZ") {
          interactionhistory_store.undo();
        } else {
          return;
        }
      } else if (event.shiftKey) {
        if (event.code === "KeyZ") {
          interactionhistory_store.redo();
        }
      } else {
        return;
      }
      domElement.focus();
    };
    const tabIndex = domElement.getAttribute("tabIndex");
    domElement.setAttribute("tabIndex", -1);
    domElement.addEventListener("keydown", onKeyDown);
    return () => {
      domElement.removeEventListener("keydown", onKeyDown);
      if (tabIndex === null) {
        domElement.removeAttribute("tabIndex");
      } else {
        domElement.setAttribute("tabIndex", tabIndex);
      }
    };
  }, [domElement, eventSystem_store, interactionhistory_store]);

  return null;
});

export default RootVKeyboardEvent;
