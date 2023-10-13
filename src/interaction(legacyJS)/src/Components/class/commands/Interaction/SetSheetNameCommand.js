import Command from "../Command";

export default class SetSheetNameCommand extends Command {
  constructor(store, uuid, newName) {
    super(store);
    this.type = "SetSheetNameCommand";
    this.name = this.type;
    this.data = {
      args: {
        uuid,
      },
      beforeName: undefined,
      afterName: newName,
    };
  }
  execute() {
    const sheet = this.store.getSheetByUuid(this.data.args.uuid);
    this.data.beforeName = sheet.name;
    sheet.setName(this.data.afterName);
  }
  undo() {
    const sheet = this.store.getSheetByUuid(this.data.args.uuid);
    sheet.setName(this.data.beforeName);
  }
  getDetailData() {
    return [this.data.beforeName, this.data.afterName];
  }
}
