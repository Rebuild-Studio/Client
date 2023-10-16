import Command from "../Command";

export default class CreateSheetCommand extends Command {
  constructor(store, args = {}) {
    super(store);
    this.type = "CreateSheetCommand";
    this.name = this.type;
    this.data = {
      args: args,
      previous: store.selectedSheet,
      order: undefined,
      json: undefined,
    };
  }
  execute() {
    /**
     * this.data.uuid !== undefined 인 경우엔, redo
     */
    const sheet = this.store.createSheet(this.data.args);
    this.data.args.uuid = sheet.uuid;
    this.data.args.name = sheet.name;
    this.store.setSelectedSheet(this.data.args.uuid);
    this.store.setSheetOrder({
      uuid: this.data.args.uuid,
      order: this.data.order,
    });

    if (!this.data.order) this.data.order = this.store.sheetOrder.length - 1;
  }
  undo() {
    this.store.setSelectedSheet(this.data.previous);
    this.store.deleteSheet(this.data.args.uuid);
  }
  getDetailData() {
    return [this.data.args.name];
  }
}
