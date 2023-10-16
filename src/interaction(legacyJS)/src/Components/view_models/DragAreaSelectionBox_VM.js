// import { action } from "mobx";
import SelectMultipleNodesAndGroupsCommand from "../class/commands/Interaction/SelectMultipleNodesAndGroupsCommand";
import storeContainer from "../stores/storeContainer";

const dragAreaSelectionBoxViewModel = {
  get getRenderedNodeInfoFromDom() {
    const canvas = document.getElementById("interactionCanvas");
    const nodes = canvas.querySelectorAll(".Node, .Group");

    return Array.from(nodes).map(node => {
      const rect = node.getBoundingClientRect();
      return {
        element: node,
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height
      };
    });
  },

  selectMultipleNodesAndGroupsFromSelectionBox: (selectionBox) => {
    const { eventSystem_store, interactionhistory_store } = storeContainer;
    const nodesInfo = dragAreaSelectionBoxViewModel.getRenderedNodeInfoFromDom;
    const uuids = [];

    nodesInfo.forEach(nodeInfo => {
      if (dragAreaSelectionBoxViewModel.isWithinSelection(selectionBox, nodeInfo)) {
        if (nodeInfo.element.getAttribute("data-name") === "node") {
          uuids.push(nodeInfo.element.getAttribute("data-nodeuuid"));
        } else {
          uuids.push(nodeInfo.element.getAttribute("data-groupuuid"));
        }
      } else {
        nodeInfo.element.style.border = "none";
      }
    });

    if (uuids.length === 0) return;
    interactionhistory_store.execute(new SelectMultipleNodesAndGroupsCommand(
      eventSystem_store,
      uuids,
      eventSystem_store.selectedSheet
    ))
  },

  isWithinSelection: (selectionBox, node) => {
    return (
      selectionBox.x < node.x + node.width &&
      selectionBox.x + selectionBox.width > node.x &&
      selectionBox.y < node.y + node.height &&
      selectionBox.y + selectionBox.height > node.y
    );
  }

};

export { dragAreaSelectionBoxViewModel };
