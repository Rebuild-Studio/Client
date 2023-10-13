import { common_store } from "../../../stores/Common_Store";
import { objectViewModel } from "../../../view_models/Object_VM";

export default class ShowObjCommand {
  constructor(metaObject) {
    this.type = " ShowObjCommand";
    this.name = "오브젝트 보이기";
    this.metaObject = metaObject;
  }

  execute() {
    this.metaObject.SetProps("visible", true);
    if (objectViewModel.IsSelectedByUUID(this.metaObject.objectId)) {
      common_store.transcontrol.attach(this.metaObject.mesh);
    }
  }

  undo() {
    this.metaObject.SetProps("visible", false);
    if (objectViewModel.IsSelectedByUUID(this.metaObject.objectId)) {
      common_store.transcontrol.detach();
    }
  }
}
