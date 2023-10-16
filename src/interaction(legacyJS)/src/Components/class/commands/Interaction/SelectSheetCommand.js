import Command from "../Command";

export default class SelectSheetCommand extends Command {
  constructor(store, uuid) {
    super(store);
    this.type = "SelectSheetCommand";
    this.name = this.type;
    this.sheet = this.store.getSheetByUuid(uuid);
    this.data = {
      uuid,
      previous: this.store.selectedSheet,
      hidden: this.sheet.hidden,
      name: this.sheet.name,
    };
  }
  execute() {
    this.store.setSelectedSheet(this.data.uuid);
  }
  undo() {
    this.store.setSelectedSheet(this.data.previous);
    if (this.data.hidden) {
      this.sheet.hide();
    }
  }
  getDetailData() {
    return [this.data.name];
  }
}
