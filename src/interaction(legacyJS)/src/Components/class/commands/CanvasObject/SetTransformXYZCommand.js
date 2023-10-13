export default class SetTransformXYZCommand {
  constructor(metaObject, args) {
    this.type = "SetTransformXYZCommand";
    this.name = "오브젝트 변형 " + "(" + args.type + ")";
    this.data = {
      metaObject: metaObject,
      type: args.type,
      newPosition: args.newPosition,
      oldPosition: args.oldPosition,
      newRotation: args.newRotation,
      oldRotation: args.oldRotation,
    };
  }
  execute() {
    this.data.metaObject.SetProps("position", this.data.newPosition);
    this.data.metaObject.SetProps("rotation", this.data.newRotation);
  }
  undo() {
    this.data.metaObject.SetProps("position", this.data.oldPosition);
    this.data.metaObject.SetProps("rotation", this.data.oldRotation);
  }
}
