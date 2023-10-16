import Command from "../Command";

export default class EditGroupNameCommand extends Command {
  constructor(store, sheetId, uuid, name) {
    super(store);
    this.type = "EditGroupNameCommand";
    this.name = this.type;
    const sheet = this.store.getSheetByUuid(sheetId);
    this.data = {
      sheetId,
      uuid,
      name,
      old: sheet.getGroupByUuid(uuid).name,
      sheetName: sheet.name,
    };
  }
  execute() {
    const sheet = this.store.getSheetByUuid(this.data.sheetId);
    sheet.setGroupName(this.data.uuid, this.data.name);
  }
  undo() {
    const sheet = this.store.getSheetByUuid(this.data.sheetId);
    sheet.setGroupName(this.data.uuid, this.data.old);
  }
  getDetailData() {
    return [this.data.sheetName, this.data.old, this.data.name];
  }
}
