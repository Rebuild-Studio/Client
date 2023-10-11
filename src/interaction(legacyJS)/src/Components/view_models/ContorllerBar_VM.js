import { common_store } from "../stores/Common_Store";
import { runInAction } from "mobx";
import {
  HotKeyFunctionsAboutToolsViewModel
} from "./03. HotKey/HotKeyFunctionsAboutTools_VM";
import { HotKeyFunctionsAboutViewViewModel } from "./03. HotKey/HotKeyFunctionsAboutView_VM";
import { undo_store } from "../stores/Undo_Store";
import UndoSceneSetting_VM from "./02. SceneSetting/UndoSceneSetting_VM";
import {controllerBar_store} from "../stores/ControllerBar_Store";

const controllerBarViewModel = {
  get gridSnap() {
    return controllerBar_store.magneticMode;
  },

  onCheckGridSnap: () => {
    HotKeyFunctionsAboutToolsViewModel.gridSnapToggle();
  },

  get rotationSnap() {
    return controllerBar_store.rotationSnapMode;
  },

  onCheckRotationSnap: () => {
    HotKeyFunctionsAboutToolsViewModel.rotationSnapToggle();
  },

  get putOnSnap() {
    return controllerBar_store.attachMode;
  },

  /** change attachMode, and sync MoveMode to attachMode's status
   */
  onCheckPutOnSnap: () => {
    HotKeyFunctionsAboutToolsViewModel.setAttachModeWithUndoRedo(!controllerBar_store.attachMode)
  },

  get snapStatus() {
    return controllerBar_store.magneticMode || controllerBar_store.attachMode || controllerBar_store.rotationSnapMode;
  },

  get gizmoStatus() {
    return controllerBar_store.gizmoStatus;
  },

  onCheckGizmoStatus: (event) => {
    if (event.target.value === "world") {
      const data = {
        name: "changeGizmoStatus",
        mode: "GizmoStatus",
        prevValue: "local",
        curValue: "world"
      }
      undo_store.AddUnDoCommand(
        undefined,
        data,
        UndoSceneSetting_VM().sceneSettingUndo,
        UndoSceneSetting_VM().sceneSettingRedo
      );
      common_store.transcontrol.setaxisType("world");
      common_store.transcontrol.setSpace("world");
    } else {
      const data = {
        name: "changeGizmoStatus",
        mode: "GizmoStatus",
        prevValue: "world",
        curValue: "local"
      }
      undo_store.AddUnDoCommand(
        undefined,
        data,
        UndoSceneSetting_VM().sceneSettingUndo,
        UndoSceneSetting_VM().sceneSettingRedo
      );
      common_store.transcontrol.setaxisType("local");
      common_store.transcontrol.setSpace("local");
    }
  },

  checkOpenedControlBarTooltip: (id) => {
    return common_store.openedControlBarTooltipId === id;
  },

  setOpenedControlBarTooltipId: (id) => {
    runInAction(() => {
      common_store.openedControlBarTooltipId = id;
    });
  },

  focusOnObject: () => {
    HotKeyFunctionsAboutViewViewModel.objEnlarge();
  },

  get normalMode() {
    return controllerBar_store.normalMode;
  },

  toggleNormalMode: (e, mode) => {
    if (mode === "normalMode") {
      HotKeyFunctionsAboutToolsViewModel.setNormalModeWithUndoRedo(true)
    } else if (mode === "attachMode") {
      HotKeyFunctionsAboutToolsViewModel.setNormalModeWithUndoRedo(false)
    } else {
      console.error("toggleNormalMode error");
    }
  }
};

export { controllerBarViewModel };
