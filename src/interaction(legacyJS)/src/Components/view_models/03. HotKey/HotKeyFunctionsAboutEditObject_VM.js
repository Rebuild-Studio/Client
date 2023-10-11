import { objectCopyCutPasteViewModel } from "../ObjectCopyCutPaste_VM";
import { common_store } from "../../stores/Common_Store";
import { object_store } from "../../stores/Object_Store";
import { HotKeyFunctionsAboutViewViewModel } from "./HotKeyFunctionsAboutView_VM";
import { objectViewModel } from "../Object_VM";
import canvasHistory_store from "../../stores/CanvasHistory_Store";

const HotKeyFunctionsAboutEditObjectViewModel = {
  copy: () => {
    objectCopyCutPasteViewModel.copy();
  },
  paste: () => {
    objectCopyCutPasteViewModel.paste();
  },
  cutAndPaste: () => {
    objectCopyCutPasteViewModel.cutAndPaste();
  },
  deleteOBJ: () => {
    objectCopyCutPasteViewModel.deleteOBJ();
  },
  setOriginMode: () => {
    common_store.setOriginMode();
    common_store.transcontrol.setaxisType("local");
    common_store.transcontrol.setSpace("local");
  },

  selectAllObject: () => {
    for (var i = 0; i < object_store.metaObjects.length; i++) {
      objectViewModel.SetSelectedObjects(object_store.metaObjects[i], "multi");
    }
  },
  deselectObject: () => {
    if (common_store.isMoveMode) {
      HotKeyFunctionsAboutViewViewModel.moveModeOff();
    } else {
      objectCopyCutPasteViewModel.deselectObject();
    }
  },

  undo: () => {
    if (common_store.isPreview) return;
    canvasHistory_store.undo();
  },

  redo: () => {
    if (common_store.isPreview) return;
    canvasHistory_store.redo();
  },
  latticefunction: () =>{
    objectCopyCutPasteViewModel.latticefunction();
  },
  deletelatticefunction: () =>{
    objectCopyCutPasteViewModel.deletelatticefunction();
  },
  booleanfunction: () =>{
    objectCopyCutPasteViewModel.booleanfunction('subtract',object_store.selectedObjects[1],object_store.selectedObjects[0]);
  }
};

export { HotKeyFunctionsAboutEditObjectViewModel };