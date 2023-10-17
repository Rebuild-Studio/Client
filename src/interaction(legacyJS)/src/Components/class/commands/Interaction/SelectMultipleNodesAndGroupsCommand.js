import Command from "../Command";
import * as Utils from "../../event-system/utils";

export default class SelectMultipleNodesAndGroupsCommand extends Command {
  constructor(store, uuids, sheetId) {
    super(store);
    this.type = "MultipleSelectWithDragBoxCommand";
    const sheet = this.store.getSheetByUuid(sheetId);
    this.data = {
      sheetId,
      uuids: uuids,
      selected: undefined,
      clearNode: undefined,
      clearGroup: undefined,
      selectedGroups: undefined,
      selectedNodes: undefined,
      sheetName: sheet.name,
    };

    this.name = "MultipleSelectWithDragBoxCommand"
  }

  execute() {
    const sheet = this.store.getSheetByUuid(this.data.sheetId);
    if (this.data.uuids) {
      this.data.uuids.map(uuid => sheet.selectNodeOrGroup(uuid));
      // sheet.selectNodeOrGroup(this.data.uuids);
    }
  }

  undo() {
    const sheet = this.store.getSelectedSheet();
    sheet.selectedNodes.clear()
    sheet.selectedGroups.clear()
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
