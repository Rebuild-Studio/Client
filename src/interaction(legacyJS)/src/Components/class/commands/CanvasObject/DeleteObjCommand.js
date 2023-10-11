import { objectViewModel } from "../../../view_models/Object_VM";
import { ObjectControllerVM } from "../../../view_models/ObjectController_VM";

export default class DeleteObjCommand {
  constructor(obj, objectId) {
    this.type = "DeleteObjCommand";
    this.name = "오브젝트 삭제";
    this.obj = obj;
    this.objectId = objectId;
  }

  execute() {
    this.obj.Delete();
  }

  undo() {
    this.obj.InitClass();
    if (this.obj.parentId) {
      const parentMetaObject = objectViewModel.GetMetaObjectByObjectId(
        this.obj.parentId
      );
      parentMetaObject.mesh.add(this.obj.mesh);
      parentMetaObject.childrenIds.push(this.objectId);
      parentMetaObject.SetGroupParent(this.objectId);
    } else {
      objectViewModel.AddRenderObject(this.obj);
    }

    ObjectControllerVM.Select(this.obj);
  }
}
