import { objectViewModel } from "../../../view_models/Object_VM";
import { ObjectControllerVM } from "../../../view_models/ObjectController_VM";

export default class DependencyCommand {
  constructor(metaObjects) {
    this.type = "DeleteObjCommand";
    this.name = "오브젝트 종속";
    this.metaObjects = metaObjects;
    this.parentMetaObject = null;
    this.childMetaObjects = [];
  }

  execute() {
    this.metaObjects.forEach((metaObject) => {
      //Parent 찾기 -> 일반 오브젝트
      if (
        metaObject.type !== "PerspectiveCamera" &&
        metaObject.type !== "Light"
      ) {
        this.parentMetaObject = metaObject;
      }
    });
    this.metaObjects.forEach((metaObject) => {
      if (metaObject !== this.parentMetaObject) {
        ObjectControllerVM.DeSelect(metaObject.objectId);
        this.parentMetaObject.AddChildmetaObject(metaObject);
        this.childMetaObjects.push(metaObject);
        if (objectViewModel.IsRenderObject) {
          objectViewModel.DeleteRenderObject(metaObject);
        }
      }
    });
  }

  undo() {
    this.childMetaObjects.forEach((metaObject) => {
      metaObject.DeleteFromParentClass();
      objectViewModel.AddRenderObject(metaObject);
    });
    this.childMetaObjects = [];
  }
}
