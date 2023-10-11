import Command from "../Command";
import * as Utils from "../../event-system/utils";

export default class UnselectNodeAndGroupCommand extends Command {
  constructor(store, uuid, sheetId) {
    super(store);
    this.type = "UnselectNodeAndGroupCommand";
    const sheet = this.store.getSheetByUuid(sheetId);
    this.data = {
      sheetId,
      uuid: uuid,
      sheetName: sheet.name,
    };
    const node = sheet.getNodeByUuid(this.data.uuid);
    if (node) {
      this.name = "UnselectNodeCommand";
      this.data.nodeType = node.type;
    } else {
      const group = sheet.getGroupByUuid(this.data.uuid);
      if (group) {
        this.name = "UnselectGroupCommand";
        this.data.groupName = group.name;
      } else {
        this.name = "ClearSelectionCommand";
      }
    }
  }
  execute() {
    const sheet = this.store.getSheetByUuid(this.data.sheetId);
    sheet.unselectNodeOrGroup(this.data.uuid);
  }
  undo() {
    const sheet = this.store.getSheetByUuid(this.data.sheetId);
    sheet.selectNodeOrGroup(this.data.uuid);
  }
  getDetailData() {
    const ret = [this.data.sheetName];
    if (this.data.nodeType) {
      ret.push(Utils.encryptString(this.data.nodeType));
    } else if (this.data.groupName) {
      ret.push(this.data.groupName);
    }
    return ret;
  }
}
