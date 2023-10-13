import { common_store } from "../stores/Common_Store";
import { object_store } from "../stores/Object_Store";
import { action } from "mobx";

const objectViewModel = {
  SetObjectClipBoard: action((object) => {
    object_store.objectClipBoard = object;
  }),
  SetIsObjectSelected: action((mode) => {
    object_store.isObjectSelected = mode;
  }),

  SetOutlineObject: action((object) => {
    if (object === null) {
      object_store.outlineObjects = [];
    } else {
      object_store.outlineObjects = [object, ...object_store.outlineObjects];
    }
  }),

  SetSelectedObjects: action((object, type) => {
    var tmpArray = object_store.selectedObjects;
    var isSelect = true;
    if (type === "tab") {
      if (object === null) {
        common_store.transcontrol.detach();
        objectViewModel.SetIsObjectSelected(false);
        object_store.selectedObjects = [];
      } else {
        objectViewModel.SetIsObjectSelected(true);
        object_store.selectedObjects = [object];
      }
    } else {
      objectViewModel.SetIsObjectSelected(true);
      for (let i = 0; i < tmpArray.length; i++) {
        if (object === tmpArray[i]) {
          tmpArray.splice(i, 1);
          isSelect = false;
        }
      }
      object_store.selectedObjects = isSelect
        ? [object, ...object_store.selectedObjects]
        : [...tmpArray];
    }
  }),

  AddMetaObject: action((metaObject) => {
    object_store.metaObjects = [...object_store.metaObjects, metaObject];
  }),
  AddRenderObject: action((metaObject) => {
    object_store.renderObjects = [...object_store.renderObjects, metaObject];
  }),
  DeleteMetaObject(metaObject) {
    for (var i = 0; i < objectViewModel.metaObjects.length; i++) {
      if (metaObject === object_store.metaObjects[i]) {
        object_store.metaObjects.splice(i, 1);
        object_store.metaObjects = [...object_store.metaObjects];
      }
    }
  },
  DeleteRenderObject(metaObject) {
    for (var i = 0; i < objectViewModel.renderObjects.length; i++) {
      if (metaObject === object_store.renderObjects[i]) {
        object_store.renderObjects.splice(i, 1);
        object_store.renderObjects = [...object_store.renderObjects];
      }
    }
  },
  IsRenderObject(metaObject) {
    for (var i = 0; i < objectViewModel.renderObjects.length; i++) {
      if (metaObject === object_store.renderObjects[i]) {
        return true;
      }
    }
    return false;
  },

  addRaycastObject: action((object) => {
    object_store.raycastObjects.push(object);
  }),

  deleteRaycastObject: action((object) => {
    var index = object_store.raycastObjects.indexOf(object);
    if (index > -1) {
      object_store.raycastObjects.splice(index, 1);
    }
  }),

  //TODO selectedObjects[0]에 해당하는 오브젝트 바꾸는 걸로 때려박음
  //다중 선택시 변경 필요
  SetProps: action((prop, value) => {
    //const object = this.getObjectByUuid(uuid);
    if (object_store.selectedObjects.length === 1) {
      object_store.selectedObjects[0].SetProps(prop, value);
    }
  }),

  GetProps(prop) {
    object_store.selectedObjects[0].GetProps(prop);
  },

  GetMetaObjectByObjectId(objectId) {
    for (const metaObject of object_store.metaObjects) {
      if (metaObject.objectId === objectId) {
        return metaObject;
      }
    }

    return null;
  },
  GetMaterialByUuid(uuid) {
    return object_store.selectedObjects[0].GetMaterialByUuid(uuid);
  },
  GetMaterialPropsByUuid(uuid) {
    return object_store.selectedObjects[0].GetMaterialPropsByUuid(uuid);
  },

  clearObject_store() {
    object_store.renderObjects.map((metaObject) => {
      metaObject.Delete();
    });

    object_store.objectClipBoard = null;
  },

  GetMetaObjectByMeshUuid(uuid) {
    for (const metaObject of object_store.metaObjects) {
      if (metaObject.mesh?.uuid === uuid) {
        return metaObject;
      }
    }
  },

  IsSelectedByUUID(objectId) {
    for (const metaObject of object_store.selectedObjects) {
      if (metaObject.objectId === objectId) return true;
    }
    return false;
  },
  FindIdxSelectedObjectByUUID(objectId) {
    const index = object_store.selectedObjects.findIndex(
      (object) => object.objectId === objectId
    );
    return index;
  },
  isSameGroup(metaObjects) {
    const object = objectViewModel.GetMetaObjectByObjectId(
      metaObjects[0].parentId
    );
    if (object) {
      for (const metaObject of object_store.selectedObjects) {
        if (
          object !==
          objectViewModel.GetMetaObjectByObjectId(metaObject.parentId)
        ) {
          return false;
        }
      }
      return true;
    }
    return false;
  },
  get metaObjects() {
    return object_store.metaObjects;
  },
  get objectClipBoard() {
    return object_store.objectClipBoard;
  },
  get outlineObjects() {
    return object_store.outlineObjects;
  },

  get prevPosition() {
    return object_store.prevPosition;
  },
  get prevRotation() {
    return object_store.prevRotation;
  },
  get raycastObjects() {
    return object_store.raycastObjects;
  },
  get selectedObjects() {
    return object_store.selectedObjects;
  },
  get isObjectSelected() {
    if (object_store.selectedObjects.length !== 0) return true;
    return false;
  },
  get renderObjects() {
    return object_store.renderObjects;
  },
};

export { objectViewModel };
