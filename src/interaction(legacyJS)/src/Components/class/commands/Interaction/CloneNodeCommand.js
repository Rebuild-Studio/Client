import Command from "../Command";
import * as Utils from "../../event-system/utils";

export default class CloneNodeCommand extends Command {
  constructor(store, srcUuids, sheetId) {
    super(store);
    this.type = "CloneNodeCommand";
    this.name = this.type;
    const sheet = this.store.getSheetByUuid(sheetId);
    this.data = {
      args: {
        sheetId,
      },
      srcUuids: srcUuids,
      uuids: undefined,
      json: undefined,
      sheetName: sheet.name,
      nodeTypes: srcUuids.map((uuid) => sheet.getNodeByUuid(uuid).type),
    };
  }
  execute() {
    const sheet = this.store.getSheetByUuid(this.data.args.sheetId);
    if (this.data.json) {
      sheet.parseInteractionJson(this.data.json);
    } else {
      const cloned = sheet.cloneNodes(
        this.data.srcUuids,
        this.data.args.sheetId
      );
      this.data.uuids = cloned.nodes.map((node) => node.uuid);
      this.data.json = Utils.stringify(cloned);
    }
  }
  undo() {
    const sheet = this.store.getSheetByUuid(this.data.args.sheetId);
    sheet.deleteNodesByUuidInSheet(this.data.uuids);
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
