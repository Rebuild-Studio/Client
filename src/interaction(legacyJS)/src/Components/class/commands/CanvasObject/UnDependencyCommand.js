import { objectViewModel } from "../../../view_models/Object_VM";

export default class UnDependencyCommand {
  constructor(metaObject) {
    this.type = "UnDependencyCommand";
    this.name = "오브젝트 종속 해제";

    this.parentMetaObject = metaObject;
    this.childMetaObjects = [];
  }

  execute() {
    this.parentMetaObject.childrenIds.forEach((childId) => {
      //Parent 찾기 -> 일반 오브젝트
      const childMetaObject = objectViewModel.GetMetaObjectByObjectId(childId);
      if (
        childMetaObject.type === "PerspectiveCamera" ||
        childMetaObject.type === "Light"
      ) {
        this.childMetaObjects.push(childMetaObject);
        childMetaObject.DeleteFromParentClass();
        objectViewModel.AddRenderObject(childMetaObject);
      }
    });
  }

  undo() {
    this.childMetaObjects.forEach((metaObject) => {
      if (metaObject !== this.parentMetaObject) {
        this.parentMetaObject.AddChildmetaObject(metaObject);
        if (objectViewModel.IsRenderObject) {
          objectViewModel.DeleteRenderObject(metaObject);
        }
      }
    });
    this.childMetaObjects = [];
  }
}
