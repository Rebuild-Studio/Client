export default class LockObjCommand {
  constructor(metaObject) {
    this.type = " LockObjCommand";
    this.name = "오브젝트 잠그기";
    this.metaObject = metaObject;
  }

  execute() {
    this.metaObject.SetProps("lock", true);
  }

  undo() {
    this.metaObject.SetProps("lock", false);
  }
}
