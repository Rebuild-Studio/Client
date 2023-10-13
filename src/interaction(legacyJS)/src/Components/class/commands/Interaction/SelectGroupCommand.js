import Command from "../Command";

export default class SelectGroupCommand extends Command {
  constructor(store, uuid, clear, sheetId) {
    super(store);
    this.type = "SelectGroupCommand";
    this.data = {
      args: {
        sheetId,
      },
      uuid: uuid,
      clear: clear,
      selectedGroups: undefined,
      selectedNodes: undefined,
      selectedSheet: undefined,
    };
  }
  execute() {
    const sheet = this.store.getSheetByUuid(this.data.args.sheetId);
    if (this.data.clear) {
      this.data.selectedGroups = sheet.clearSelectedGroups();
      this.data.selectedNodes = sheet.clearSelectedNodes();
    }
    if (this.data.uuid) {
      this.data.selectedSheet = this.store.selectedSheet;
      this.store.setSelectedSheet(this.data.args.sheetId);
      sheet.selectGroup(this.data.uuid);
    }
  }
  undo() {
    const sheet = this.store.getSelectedSheet();
    if (this.data.uuid) {
      sheet.unselectGroup(this.data.uuid);
      this.store.setSelectedSheet(this.data.selectedSheet);
    }
    if (this.data.clear) {
      sheet.selectGroups(this.data.selectedGroups);
      sheet.selectNodes(this.data.selectedNodes);
    }
  }
}
