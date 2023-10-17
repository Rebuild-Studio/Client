/* eslint-disable array-callback-return */
import { action } from "mobx";
import { hierarchy_store } from "../../stores/Hierarchy_Store";
import { eventSystem_store } from "../../stores/Interaction_Stores";

const InteractionHierachyVM = {
  get interactionHierarchyList() {
    return hierarchy_store.interactionHierarchyList;
  },

  get dividerIndex() {
    return hierarchy_store.dividerIndex;
  },

  InteractionHierachyListFilter: action(() => {
    const sheet = eventSystem_store.getSelectedSheet();
    const interactionHierarchyList = [];
    const nodesAndGroups = sheet.getNodesAndGroups();

    for (const obj of nodesAndGroups) {
      if (obj.type === "group") {
        const group = obj;

        interactionHierarchyList.push(group);
        if (group.folder === "open") {
          for (const node of nodesAndGroups) {
            if (node.group === group.uuid) {
              interactionHierarchyList.push(node);
            }
          }
        }
      }
    }

    for (const obj of nodesAndGroups) {
      if (obj.group === null) {
        const node = obj;

        interactionHierarchyList.push(node);
      }
    }

    hierarchy_store.interactionHierarchyList = [...interactionHierarchyList];
  }),

  addGroupToHierarchyUI: action((group, children) => {
    const rearrangeList = hierarchy_store.interactionHierarchyList.filter(
      (obj) => obj.group !== group.uuid
    );

    hierarchy_store.interactionHierarchyList = [
      group,
      ...children,
      ...rearrangeList,
    ];
  }),

  excludeChildFromGroupToHierarchyUI: action((group, children) => {
    const rearrangeList = [...hierarchy_store.interactionHierarchyList];
    const startIndex = hierarchy_store.interactionHierarchyList.findIndex(
      (obj) => obj.uuid === children.uuid
    );
    let endIndex = hierarchy_store.dividerIndex;

    if (startIndex < endIndex) {
      endIndex -= 1;
    }

    const element = rearrangeList.splice(startIndex, 1)[0];
    rearrangeList.splice(endIndex, 0, element);
    hierarchy_store.interactionHierarchyList = [...rearrangeList];
  }),

  setdividerIndex: action((index) => {
    hierarchy_store.dividerIndex = index;
  }),

  moveToDividerIndex: action((uuid, endIndex) => {
    const rearrangeList = [...hierarchy_store.interactionHierarchyList];
    const startIndex = hierarchy_store.interactionHierarchyList.findIndex(
      (obj) => obj.uuid === uuid
    );

    if (startIndex < endIndex) {
      endIndex -= 1;
    }

    const element = rearrangeList.splice(startIndex, 1)[0];
    rearrangeList.splice(endIndex, 0, element);
    hierarchy_store.interactionHierarchyList = [...rearrangeList];
  }),

  toggleFolder: action((object) => {
    const sheet = eventSystem_store.getSelectedSheet();
    let rearrangeList = [...hierarchy_store.interactionHierarchyList];

    if (object.type === "group" && object.folder === "close") {
      const group = object;

      const childrenList = sheet.nodesAndGroups.filter(
        (obj) => obj.group === group.uuid
      );

      sheet.openFolderByUuid(group.uuid);

      rearrangeList.splice(
        rearrangeList.indexOf(object) + 1,
        0,
        ...childrenList
      );
    } else if (object.type === "group" && object.folder === "open") {
      const group = object;

      sheet.closeFolderByUuid(group.uuid);

      rearrangeList = rearrangeList.filter((obj) => obj.group !== object.uuid);
    }
    hierarchy_store.interactionHierarchyList = [...rearrangeList];
  }),
};

export default InteractionHierachyVM;
