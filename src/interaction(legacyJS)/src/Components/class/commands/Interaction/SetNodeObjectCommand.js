import Command from "../Command";
import * as Utils from "../../event-system/utils";

export default class SetNodeObjectCommand extends Command {
  constructor(store, uuid, key, value, sheetId) {
    super(store);
    this.type = "SetNodeObjectCommand";
    this.name = "SetNodeDataCommand";
    const sheet = this.store.getSheetByUuid(sheetId);
    this.data = {
      args: {
        sheetId,
      },
      uuid: uuid,
      key: key,
      value: value,
      beforeJson: undefined,
      afterJson: undefined,
      sheetName: sheet.name,
      nodeType: sheet.getNodeByUuid(uuid).type,
    };
  }
  execute() {
    const sheet = this.store.getSheetByUuid(this.data.args.sheetId);
    if (!this.data.afterJson) {
      const node = sheet.getNodeByUuid(this.data.uuid);
      const before = {
        nodes: [node],
        wires: sheet.getWiresInNode(node),
      };
      this.data.beforeJson = Utils.stringify(before);
      sheet.setObjectValueProp(this.data.uuid, this.data.key, this.data.value);
    } else {
      sheet.parseInteractions(Utils.parse(this.data.afterJson));
    }
  }
  undo() {
    const sheet = this.store.getSheetByUuid(this.data.args.sheetId);
    const node = sheet.getNodeByUuid(this.data.uuid);
    const after = {
      nodes: [node],
    };
    this.data.afterJson = Utils.stringify(after);
    sheet.parseInteractions(Utils.parse(this.data.beforeJson));
  }
  getDetailData() {
    return [this.data.sheetName, Utils.encryptString(this.data.nodeType)];
  }
}
