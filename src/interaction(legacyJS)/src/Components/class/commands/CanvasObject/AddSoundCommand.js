import { ObjectControllerVM } from "../../../view_models/ObjectController_VM";

export default class AddSoundCommand {
  constructor(obj) {
    this.type = "AddSoundCommand";
    this.name = "사운드 추가";
    this.obj = obj;
  }

  execute() {
    this.obj.initClass();
    ObjectControllerVM.Select(this.obj);
  }

  undo() {
    this.obj.deleteMeta();
    this.obj.stopSound();
  }
}
