import Command from "../Command";
import * as Utils from "../../event-system/utils";

export default class CloneGroupCommand extends Command {
  constructor(store, srcUuids, sheetId) {
    super(store);
    this.type = "CloneGroupCommand";
    this.data = {
      sheetId,
      srcUuids: srcUuids,
      uuids: undefined,
      json: undefined,
    };
  }
  execute() {
    const sheet = this.store.getSheetByUuid(this.data.sheetId);
    if (this.data.json) {
      sheet.parseInteractionJson(this.data.json);
    } else {
      const cloned = sheet.cloneGroups(this.data.srcUuids, this.data.sheetId);
      this.data.uuids = cloned.current.map((group) => group.uuid);
      this.data.json = Utils.stringify(cloned);
    }
  }
  undo() {
    const sheet = this.store.getSheetByUuid(this.data.sheetId);
    sheet.deleteGroupsAndChildren(this.data.uuids);
  }
}
