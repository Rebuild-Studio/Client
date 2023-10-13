import Command from "../Command";

export default class AddSelectedNodesPositionCommand extends Command {
  constructor(store, movement, sheetId) {
    super(store);
    this.type = "AddSelectedNodesPositionCommand";
    this.name = this.type;
    this.updatable = true;
    this.data = {
      args: {
        sheetId,
      },
      movement: movement,
      moved: movement,
      sheetName: this.store.getSheetByUuid(sheetId).name,
    };
  }
  execute() {
    const sheet = this.store.getSheetByUuid(this.data.args.sheetId);
    sheet.addSelectedNodesPosition(this.data.movement);
  }
  undo() {
    const sheet = this.store.getSheetByUuid(this.data.args.sheetId);
    this.data.movement = this.data.moved;
    sheet.addSelectedNodesPosition(this.data.moved.map((m) => m * -1));
  }
  update(cmd) {
    this.data.movement = cmd.data.movement;
    this.data.moved = this.data.moved.map((m, i) => m + cmd.data.movement[i]);
  }
  getDetailData() {
    return [
      this.data.sheetName,
      this.data.moved.map((v) => v.toString()),
    ].flat();
  }
}
