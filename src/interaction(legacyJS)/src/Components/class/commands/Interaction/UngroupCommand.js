import Command from "../Command";
import * as Utils from "../../event-system/utils";

export default class UngroupCommand extends Command {
  constructor(store, sheetId, uuids) {
    super(store);
    this.type = "UngroupCommand";
    this.name = this.type;
    const sheet = this.store.getSheetByUuid(sheetId);
    this.data = {
      sheetId,
      uuids,
      json: undefined,
      sheetName: sheet.name,
      groupNames: uuids.map((uuid) => sheet.getGroupByUuid(uuid).name),
    };
  }
  execute() {
    const sheet = this.store.getSheetByUuid(this.data.sheetId);
    const groups = this.data.uuids?.map((uuid) => sheet.getGroupByUuid(uuid));
    this.data.json = Utils.stringify({ groups });
    for (var uuid of this.data.uuids) {
      sheet.deleteGroupByUuid(uuid);
    }
  }
  undo() {
    const sheet = this.store.getSheetByUuid(this.data.sheetId);
    sheet.parseInteractionJson(this.data.json);
  }
  getDetailData() {
    let intermediate = "";
    const groupNames = this.data.groupNames.map((v, i) => {
      intermediate += Utils.templateArg(i + 2) + ", ";
      return v;
    });

    return [this.data.sheetName, intermediate.slice(0, -2), groupNames].flat();
  }
}
