import Command from "../Command";

export default class ConvertToFunctionCommand extends Command {
  constructor(store, uuid) {
    super(store);
    this.type = "ConvertToFunctionCommand";
    this.name = this.type;
    this.sheet = this.store.getSheetByUuid(uuid);
    this.data = {
      uuid,
      selected: uuid === this.store.selectedSheet,
      name: this.sheet.name,
    };
  }
  execute() {
    this.sheet.setType("function");
  }
  undo() {
    this.sheet.setType("sheet");
  }
  getDetailData() {
    return [this.data.name];
  }
}
