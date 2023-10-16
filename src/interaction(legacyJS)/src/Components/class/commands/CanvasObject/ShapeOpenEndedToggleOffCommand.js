//prettier-ignore
export default class ShapeOpenEndedToggleOffCommand {
  constructor(metaObject) {
    this.type = "ShapeOpenEndedToggleOffCommands";
    this.name ="밑면 숨기기"
    this.metaObject = metaObject;
  }

  execute() {
  
    this.metaObject.SetProps("openEnded", true);
  }

  undo() {
    this.metaObject.SetProps("openEnded", false);
  }
}
