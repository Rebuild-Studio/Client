/* eslint-disable array-callback-return */
import { action } from "mobx";
import { hierarchy_store } from "../../stores/Hierarchy_Store";
import { object_store } from "../../stores/Object_Store";
import { objectViewModel } from "../Object_VM";
import UUIDGenerator from "../../../utils/uuid";
class UIData {
  type = null;
  object = null;
  objectId = null;
  children = [];
  depth = null;
  uuid = UUIDGenerator.run();
  constructor(type, object, depth) {
    this.type = type;
    this.object = object;
    this.objectId = object.objectId;
    this.depth = depth;
  }
  add(uiData) {
    this.children.push(uiData);
  }
}

const HierachyVM = {
  // list: [],
  get hierachyList() {
    //this.list = hierarchy_store.hierachyList;

    return hierarchy_store.hierachyList;
  },

  HierachyListFilter: action(() => {
    const queue = []; //[object,depth]
    const visit = {};
    hierarchy_store.hierachyList = [];

    object_store.metaObjects.map((object) => {
      const isSoundObject = !object.childrenIds;

      if (!visit[object.objectId] && !isSoundObject) {
        visit[object.objectId] = true;
        queue.push([object, 0]);

        const uiRoot = HierachyVM.GetUIDataByObject(object, 0);
        hierarchy_store.hierachyList.push(uiRoot);

        while (queue.length !== 0) {
          const [object, depth] = queue.shift();

          const uiDataParent = HierachyVM.GetUIDataByObject(object, depth);

          for (const childId of object.childrenIds) {
            visit[childId] = true;

            const childObject =
              objectViewModel.GetMetaObjectByObjectId(childId);

            if (HierachyVM.IsUIDataByObjectID(childId))
              HierachyVM.RemoveUIDataByObjectId(childId);

            const idDataChild = HierachyVM.GetUIDataByObject(
              childObject,
              depth + 1
            );

            uiDataParent.add(idDataChild);

            queue.push([childObject, depth + 1]);
          }
        }
      } else {
        return null;
      }
    });
  }),

  GetUIDataByObject: action((object, depth) => {
    for (const uiData of hierarchy_store.hierachyList) {
      if (object.objectId === uiData.objectId) {
        return uiData;
      } else {
        if (uiData.children.length !== 0) {
          for (const childUIData of uiData.children) {
            const foundUIData = HierachyVM.GetUIDataByUIData(
              object,
              childUIData
            );
            if (foundUIData) {
              return foundUIData;
            }
          }
        }
      }
    }
    return new UIData(object.type, object, depth);
  }),

  GetUIDataByUIData: action((target, uiData) => {
    if (target.objectId === uiData.objectId) {
      return uiData;
    } else {
      if (uiData.children.length !== 0) {
        for (const childUIData of uiData.children) {
          const foundUIData = HierachyVM.GetUIDataByUIData(target, childUIData);
          if (foundUIData) {
            return foundUIData;
          }
        }
      }
    }

    return null;
  }),

  IsUIDataByObjectID: action((objectId) => {
    for (const uiData of hierarchy_store.hierachyList) {
      if (objectId === uiData.objectId) {
        return true;
      }
    }
    return false;
  }),

  RemoveUIDataByObjectId: action((objectId) => {
    const index = hierarchy_store.hierachyList.findIndex(
      (uiData) => uiData.objectId === objectId
    );
    if (index !== -1) {
      hierarchy_store.hierachyList.splice(index, 1);
    }
  }),
};

export default HierachyVM;
