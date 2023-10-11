import Command from "../Command";
import * as Utils from "../../event-system/utils";

export default class SetNodeReferenceDataCommand extends Command {
  constructor(store, reference, newValue) {
    super(store);
    this.type = "SetNodeReferenceDataCommand";
    this.name = this.type;
    this.sheet = store.getSheetByUuid(store.selectedSheet);
    this.reference = reference;
    this.prevValue = reference.defaultValue;
    this.newValue = newValue;
  }

  execute() {
    this.reference.defaultValue = this.newValue;
  }
  undo() {
    this.reference.defaultValue = this.prevValue;
  }
  getDetailData() {
    return [this.sheet.name, Utils.encryptString(this.reference.name)];
  }
}
