import { action } from "mobx";
import { contextMenuViewModel } from "../01. ContextMenu/ContextMenu_VM";
import { ObjectControllerVM } from "../ObjectController_VM";
import { common_store } from "../../stores/Common_Store";
import { objectViewModel } from "../Object_VM";
import canvasHistory_store from "../../stores/CanvasHistory_Store";
import HideObjCommand from "../../class/commands/CanvasObject/HideObjCommand";
import ShowObjCommand from "../../class/commands/CanvasObject/ShowObjCommand";

const HierachyBtnVM = {
  onContextMenuOpen: action((event, object) => {
    if (!objectViewModel.IsSelectedByUUID(object.objectId)) {
      ObjectControllerVM.Select(object);
    }
    contextMenuViewModel.handleClick(event);
  }),
  onClickHandler: action((object) => {
    if (!objectViewModel.IsSelectedByUUID(object.objectId)) {
      ObjectControllerVM.Select(object);
      if (object.props["lock"]) {
        common_store.transcontrol.detach();
      }
    } else {
      ObjectControllerVM.DeSelect(object.objectId);
      ObjectControllerVM.AttachTranscontrolToSelectedObject();
    }
  }),
  LockBtnHandler: action((e, object) => {
    e.preventDefault();
    e.stopPropagation();

    ObjectControllerVM.Lock(object);
  }),
  HideBtnHandler: action((e, object) => {
    e.preventDefault();
    e.stopPropagation();
    if (object.props["visible"]) {
      canvasHistory_store.execute(new HideObjCommand(object));
    } else {
      canvasHistory_store.execute(new ShowObjCommand(object));
    }
  }),
};

export default HierachyBtnVM;
