import storeContainer from "../stores/storeContainer";
import { objectViewModel } from "../view_models/Object_VM";
import { ObjectControllerVM } from "./ObjectController_VM";

export default function Undo3D_VM() {
  const { undo_store } = storeContainer;

  function ReTargetByObjectId(target, objectId) {
    for (const command of undo_store.unDoArray) {
      if (command.data.objectId === objectId) {
        command.target = target;
      }
    }
    for (const command of undo_store.reDoArray) {
      if (command.data.objectId === objectId) {
        command.target = target;
      }
    }
  }
  function addUndo(target, data) {
    ObjectControllerVM.DeSelectAll();
    if (objectViewModel.selectedObjects[0] === target) {
      objectViewModel.SetSelectedObjects(null, "tab");
    }

    target.DeleteMeta();
  }
  async function addRedo(target, data) {
    var reDoObject = target;
    await reDoObject.Init(data.group);
    ReTargetByObjectId(reDoObject, data.objectId);
  }
  async function deleteUndo(target, data) {
    var unDoObject = target;
    await unDoObject.Init(data.group);
    ReTargetByObjectId(unDoObject, data.objectId);
  }
  function deleteRedo(target, data) {
    ObjectControllerVM.DeSelectAll();
    target.DeleteMeta();
  }

  return {
    addUndo,
    addRedo,
    deleteUndo,
    deleteRedo,
  };
}
