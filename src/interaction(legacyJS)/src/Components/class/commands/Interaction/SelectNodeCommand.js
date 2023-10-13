import Command from "../Command";
import * as Utils from "../../event-system/utils";

export default class SelectNodeCommand extends Command {
  constructor(store, uuid, clear, sheetId) {
    super(store);
    this.type = "SelectNodeCommand";
    this.name = uuid ? this.type : "ClearNodeSelectionCommand";
    const sheet = this.store.getSheetByUuid(sheetId);
    this.data = {
      args: {
        sheetId,
      },
      uuid: uuid,
      clear: clear,
      selectedGroups: undefined,
      selectedNodes: undefined,
      selectedSheet: undefined,
      sheetName: sheet.name,
    };
    if (uuid) {
      this.data.nodeType = sheet.getNodeByUuid(uuid).type;
    }
  }
  execute() {
    const sheet = this.store.getSheetByUuid(this.data.args.sheetId);
    if (this.data.clear) {
      this.data.selectedGroups = sheet.clearSelectedGroups();
      this.data.selectedNodes = sheet.clearSelectedNodes();
    }
    if (this.data.uuid) {
      this.data.selectedSheet = this.store.selectedSheet;
      this.store.setSelectedSheet(this.data.args.sheetId);
      sheet.selectNode(this.data.uuid);
    }
  }
  undo() {
    const sheet = this.store.getSheetByUuid(this.data.args.sheetId);
    if (this.data.uuid) {
      sheet.unselectNode(this.data.uuid);
      this.store.setSelectedSheet(this.data.selectedSheet);
    }
    if (this.data.clear) {
      sheet.selectGroups(this.data.selectedGroups);
      sheet.selectNodes(this.data.selectedNodes);
    }
  }
  getDetailData() {
    const ret = [this.data.sheetName];
    if (this.data.nodeType) {
      ret.push(Utils.encryptString(this.data.nodeType));
    }
    return ret;
  }
}
