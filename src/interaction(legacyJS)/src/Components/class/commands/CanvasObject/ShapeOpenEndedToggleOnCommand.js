export default class ShapeOpenEndedToggleOnCommand {
  constructor(metaObject) {
    this.type = "ShapeOpenEndedToggleOnCommands";
    this.name = "밑면 보이기";
    this.metaObject = metaObject;
  }

  execute() {
    this.metaObject.SetProps("openEnded", false);
  }

  undo() {
    this.metaObject.SetProps("openEnded", true);
  }
}
