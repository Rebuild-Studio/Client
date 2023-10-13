import Command from "../Command";

export default class HideSheetCommand extends Command {
  constructor(store, uuid) {
    super(store);
    this.type = "HideSheetCommand";
    this.name = this.type;
    this.sheet = this.store.getSheetByUuid(uuid);
    this.data = {
      uuid,
      selected: uuid === this.store.selectedSheet,
      name: this.sheet.name,
    };
  }
  execute() {
    this.sheet.hide();
    if (this.data.selected) {
      this.store.setSelectedSheet(this.store.visibleSheetOrder[0]);
    }
  }
  undo() {
    if (this.data.selected) {
      this.store.setSelectedSheet(this.data.uuid);
    } else {
      this.sheet.show();
    }
  }
  getDetailData() {
    return [this.data.name];
  }
}
