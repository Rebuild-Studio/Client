import Command from "../Command";
import * as Utils from "../../event-system/utils";

export default class CreateWireCommand extends Command {
  constructor(store, uuids, sheetId) {
    super(store);
    this.type = "CreateWireCommand";
    this.name = this.type;
    const sheet = this.store.getSheetByUuid(sheetId);
    const sockets = uuids.map((uuid) => sheet.getSocketByUuid(uuid));
    this.data = {
      args: {
        uuid: undefined,
        uuids: uuids,
        sheetId,
      },
      json: undefined,
      sheetName: sheet.name,
      nodeTypes: sockets.map((socket) => sheet.getNodeByUuid(socket.node).type),
      socketTypes: sockets.map((socket) => socket.name),
    };
  }
  execute() {
    const sheet = this.store.getSheetByUuid(this.data.args.sheetId);
    if (this.data.json) {
      sheet.parseInteractionJson(this.data.json);
    } else {
      const wire = sheet.createWireByUuidInSheet(
        this.data.args.uuids,
        this.data.args.sheetId
      );
      this.data.args.uuid = wire.uuid;
      this.data.json = Utils.stringify({
        nodes: [],
        wires: [wire],
        sheetId: this.data.args.sheetId,
      });
    }
  }
  undo() {
    const sheet = this.store.getSheetByUuid(this.data.args.sheetId);
    sheet.deleteWireByUuidInSheet(this.data.args.uuid, this.data.args.sheetId);
  }
  getDetailData() {
    return [
      this.data.sheetName,
      this.data.nodeTypes.map((v) => Utils.encryptString(v)),
      this.data.socketTypes.map((v) => Utils.encryptString(v)),
    ].flat();
  }
}
