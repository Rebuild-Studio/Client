import Command from "../Command";
import * as Utils from "../../event-system/utils";

export default class DeleteSelectedNodeCommand extends Command {
  constructor(store, args) {
    super(store);
    this.type = "DeleteSelectedNodeCommand";
    this.name = this.type;
    const sheet = this.store.getSheetByUuid(args.sheetId);
    this.data = {
      args,
      selected: this.store.selectedNodes.slice(),
      json: undefined,
      sheetName: sheet.name,
    };
    this.data.nodeTypes = this.data.selected.map(
      (uuid) => sheet.getNodeByUuid(uuid).type
    );
  }
  execute() {
    const sheet = this.store.getSheetByUuid(this.data.args.sheetId);
    const nodes = this.data.selected.map((uuid) => sheet.getNodeByUuid(uuid));
    const wires = sheet.getWiresInNodes(nodes);
    this.data.json = Utils.stringify({
      nodes: nodes,
      wires: wires,
      sheetId: this.data.args.sheetId,
    });
    sheet.deleteSelectedNodesInSheet(this.data.args.sheetId);
  }
  undo() {
    const sheet = this.store.getSheetByUuid(this.data.args.sheetId);
    sheet.parseInteractionJson(this.data.json);
    sheet.selectNodes(this.data.selected);
  }
  getDetailData() {
    let intermediate = "";
    const nodeTypes = this.data.nodeTypes.map((v, i) => {
      intermediate += Utils.templateArg(i + 2) + ", ";
      return Utils.encryptString(v);
    });
    return [this.data.sheetName, intermediate.slice(0, -2), nodeTypes].flat();
  }
}
