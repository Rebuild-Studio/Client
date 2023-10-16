import { common_store } from "../../stores/Common_Store";
import { undo_store } from "../../stores/Undo_Store";
import UndoSceneSetting_VM from "../02. SceneSetting/UndoSceneSetting_VM";
import { controllerBar_store } from "../../stores/ControllerBar_Store";

const HotKeyFunctionsAboutToolsViewModel = {

  rotationSnapToggle: () => {
    if (!common_store.isPreview && common_store.curCategory === "canvas") {
      const data = {
        name: "changeRotationSnap",
        mode: "RotationSnapMode",
        curValue: undefined,
        newValue: undefined,
      }
      undo_store.AddUnDoCommand(
        undefined,
        data,
        UndoSceneSetting_VM().sceneSettingUndo,
        UndoSceneSetting_VM().sceneSettingRedo
      );
      controllerBar_store.setRotationSnapMode(!controllerBar_store.rotationSnapMode);
    }
  },

  gridSnapToggle: () => {
    if (!common_store.isPreview && common_store.curCategory === "canvas") {
      const data = {
        name: "changeGridSnap",
        mode: "MagneticMode",
        curValue: undefined,
        newValue: undefined,
      };
      undo_store.AddUnDoCommand(
        undefined,
        data,
        UndoSceneSetting_VM().sceneSettingUndo,
        UndoSceneSetting_VM().sceneSettingRedo
      );
      controllerBar_store.setMagneticMode(!controllerBar_store.magneticMode)

    }
  },

  setNormalModeWithUndoRedo: (mode) => {
    if (mode === controllerBar_store.normalMode) return;
    const data = {
      name: "changeNormalMode",
      mode: "NormalMode",
      prevValue: controllerBar_store.normalMode,
      curValue: mode,
    }
    undo_store.AddUnDoCommand(
      undefined,
      data,
      UndoSceneSetting_VM().sceneSettingUndo,
      UndoSceneSetting_VM().sceneSettingRedo
    );
    controllerBar_store.setNormalMode(mode)
  },

  setAttachModeWithUndoRedo: (mode) => {
    if (mode === controllerBar_store.attachMode) return;
    const data = {
      name: "changeAttachMode",
      mode: "AttachMode",
      prevValue: controllerBar_store.attachMode,
      curValue: !controllerBar_store.attachMode,
    }
    undo_store.AddUnDoCommand(
      undefined,
      data,
      UndoSceneSetting_VM().sceneSettingUndo,
      UndoSceneSetting_VM().sceneSettingRedo
    );
    controllerBar_store.setAttachMode(mode)
  },

  putOnSnapToggle: () => {
    if (!common_store.isPreview && common_store.curCategory === "canvas") {
      if (controllerBar_store.attachMode) {
        if (controllerBar_store.normalMode) {
          HotKeyFunctionsAboutToolsViewModel.setNormalModeWithUndoRedo(false)
        } else {
          HotKeyFunctionsAboutToolsViewModel.setAttachModeWithUndoRedo(false);
        }
      } else {
        HotKeyFunctionsAboutToolsViewModel.setAttachModeWithUndoRedo(true);
      }
    }
  },

  normalSnapToggle: () => {
    if (!common_store.isPreview && common_store.curCategory === "canvas") {
      if (controllerBar_store.attachMode && controllerBar_store.normalMode) {
        HotKeyFunctionsAboutToolsViewModel.setAttachModeWithUndoRedo(false);
      } else {
        HotKeyFunctionsAboutToolsViewModel.setAttachModeWithUndoRedo(true);
        HotKeyFunctionsAboutToolsViewModel.setNormalModeWithUndoRedo(true);
      }
    }
  },

  toggleGlobalLocal: () => {
    if (!common_store.isPreview && common_store.curCategory === "canvas") {
      if (common_store.transcontrol.getaxisType() === "world") {
        common_store.transcontrol.setaxisType("local");
        common_store.transcontrol.setSpace("local");
      } else {
        common_store.transcontrol.setaxisType("world");
        common_store.transcontrol.setSpace("world");
      }
    }
  },
};

export { HotKeyFunctionsAboutToolsViewModel };
