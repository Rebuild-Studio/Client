import Command from "../Command";
import * as Utils from "../../event-system/utils";

export default class SetNodeDataCommand extends Command {
  constructor(store, uuid, key, value, sheetId) {
    super(store);
    this.type = "SetNodeDataCommand";
    this.name = this.type;
    const sheet = this.store.getSheetByUuid(sheetId);
    this.data = {
      args: {
        sheetId,
      },
      uuid: uuid,
      key: key,
      value: value,
      previous: undefined,
      sheetName: sheet.name,
      nodeType: sheet.getNodeByUuid(uuid).type,
    };
  }
  execute() {
    const sheet = this.store.getSheetByUuid(this.data.args.sheetId);
    if (typeof this.data.previous === "undefined") {
      this.data.previous = sheet.getNodeByUuid(this.data.uuid).control[
        this.data.key
      ].value;
    }
    sheet.setValueProp(this.data.uuid, this.data.key, this.data.value);
  }
  undo() {
    const sheet = this.store.getSheetByUuid(this.data.args.sheetId);
    sheet.setValueProp(this.data.uuid, this.data.key, this.data.previous);
  }
  getDetailData() {
    return [this.data.sheetName, Utils.encryptString(this.data.nodeType)];
  }
}
