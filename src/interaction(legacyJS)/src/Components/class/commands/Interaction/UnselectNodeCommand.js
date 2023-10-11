import Command from "../Command";
import * as Utils from "../../event-system/utils";

export default class UnselectNodeCommand extends Command {
  constructor(store, uuid, sheetId) {
    super(store);
    this.type = "UnselectNodeCommand";
    this.name = this.type;
    const sheet = this.store.getSheetByUuid(sheetId);
    this.data = {
      args: {
        sheetId,
      },
      uuid: uuid,
      selected: undefined,
      sheetName: sheet.name,
      nodeType: sheet.getNodeByUuid(uuid).type,
    };
  }
  execute() {
    const sheet = this.store.getSheetByUuid(this.data.args.sheetId);
    sheet.unselectNode(this.data.uuid);
  }
  undo() {
    const sheet = this.store.getSheetByUuid(this.data.args.sheetId);
    sheet.selectNode(this.data.uuid);
  }
  getDetailData() {
    return [this.data.sheetName, Utils.encryptString(this.data.nodeType)];
  }
}
