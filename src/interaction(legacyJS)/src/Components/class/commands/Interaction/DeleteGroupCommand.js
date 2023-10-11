import Command from "../Command";
import * as Utils from "../../event-system/utils";

export default class DeleteGroupCommand extends Command {
  constructor(store, sheetId, uuids) {
    super(store);
    this.type = "DeleteGroupCommand";
    this.data = {
      uuids,
      sheetId,
      json: undefined,
    };
  }
  execute() {
    const sheet = this.store.getSheetByUuid(this.data.sheetId);

    this.data.json = Utils.stringify(
      sheet.getGroupsDescendants(this.data.uuids)
    );

    for (var uuid of this.data.uuids) {
      sheet.deleteGroupAndChildrenByUuid(uuid);
    }
  }
  undo() {
    const sheet = this.store.getSheetByUuid(this.data.sheetId);
    sheet.parseInteractionJson(this.data.json);
  }
}
