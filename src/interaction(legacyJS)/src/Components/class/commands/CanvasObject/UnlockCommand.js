export default class UnlockObjCommand {
  constructor(metaObject) {
    this.type = " UnlockObjCommand";
    this.name = "오브젝트 잠금 해제";
    this.metaObject = metaObject;
  }

  execute() {
    this.metaObject.SetProps("lock", false);
  }

  undo() {
    this.metaObject.SetProps("lock", true);
  }
}
