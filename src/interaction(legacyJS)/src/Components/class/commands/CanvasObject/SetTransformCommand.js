export default class SetTransformCommand {
  constructor(metaObject, args) {
    this.type = "SetTransformCommand";
    this.name = "오브젝트 변형 " + "(" + args.type + ")";
    this.data = {
      metaObject: metaObject,
      type: args.type,
      newValue: args.newValue,
      oldValue: args.oldValue,
    };
  }
  execute() {
    this.data.metaObject.SetProps(this.data.type, this.data.newValue);
  }
  undo() {
    this.data.metaObject.SetProps(this.data.type, this.data.oldValue);
  }
}
