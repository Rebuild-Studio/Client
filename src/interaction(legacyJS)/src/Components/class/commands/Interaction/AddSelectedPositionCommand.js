import { makeObservable, observable, action } from "mobx";
import Command from "../Command";

export default class AddSelectedPositionCommand extends Command {
  constructor(store, movement, sheetId) {
    super(store);
    this.type = "AddSelectedPositionCommand";
    this.updatable = true;
    const sheet = this.store.getSheetByUuid(sheetId);
    this.data = {
      sheetId,
      movement: movement,
      moved: movement,
      targetNodes: sheet.selectedNodes.slice(),
      sheetName: sheet.name,
    };
    this.data.targetGroups = sheet.selectedGroups
      .slice()
      .filter((groupuuid) => {
        return !this.data.targetNodes.some((node) =>
          sheet.getChildrenOfGroup(groupuuid).includes(node)
        );
      });
    this.name =
      this.data.targetNodes.length > 0
        ? this.data.targetGroups.length > 0
          ? "AddSelectedPositionCommand"
          : "AddSelectedNodesPositionCommand"
        : "AddSelectedGroupsPositionCommand";
    makeObservable(this, {
      data: observable,
      execute: action,
      undo: action,
      update: action,
    });
  }
  execute() {
    const sheet = this.store.getSheetByUuid(this.data.sheetId);
    sheet.addNodesPosition(this.data.targetNodes, this.data.movement);
    sheet.addGroupsPosition(this.data.targetGroups, this.data.movement);
  }
  undo() {
    const sheet = this.store.getSheetByUuid(this.data.sheetId);
    this.data.movement = this.data.moved;
    const position = this.data.moved.map((m) => m * -1);
    sheet.addNodesPosition(this.data.targetNodes, position);
    sheet.addGroupsPosition(this.data.targetGroups, position);
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
