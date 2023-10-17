import { objectViewModel } from "../../../view_models/Object_VM";
import { ObjectControllerVM } from "../../../view_models/ObjectController_VM";

export default class AddObjCommand {
  constructor(obj, objectId) {
    this.type = "AddObjCommand";
    this.name = "오브젝트 추가";
    this.obj = obj;
    this.objectId = objectId;
  }

  execute() {
    this.obj.InitClass();

    objectViewModel.AddRenderObject(this.obj);
    ObjectControllerVM.Select(this.obj);
  }

  undo() {
    this.obj.Delete();
  }
}
