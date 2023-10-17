import { common_store } from "../../../stores/Common_Store";
import { objectViewModel } from "../../../view_models/Object_VM";

export default class HideObjCommand {
  constructor(metaObject) {
    this.type = " HideObjCommand";
    this.name = "오브젝트 숨기기";
    this.metaObject = metaObject;
  }

  execute() {
    this.metaObject.SetProps("visible", false);
    if (objectViewModel.IsSelectedByUUID(this.metaObject.objectId))
      common_store.transcontrol.detach();
  }

  undo() {
    this.metaObject.SetProps("visible", true);
    if (objectViewModel.IsSelectedByUUID(this.metaObject.objectId))
      common_store.transcontrol.attach(this.metaObject.mesh);
  }
}
