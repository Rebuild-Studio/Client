import Command from "../Command";
import * as Utils from "../../event-system/utils";

export default class DeleteWireCommand extends Command {
  constructor(store, uuid, sheetId) {
    super(store);
    this.type = "DeleteWireCommand";
    this.name = this.type;
    const sheet = this.store.getSheetByUuid(sheetId);
    const wire = sheet.getWireByUuid(uuid);
    const sockets = [wire.tailSocket, wire.headSocket].map((v) =>
      sheet.getSocketByUuid(v)
    );
    this.data = {
      args: {
        uuid,
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
    const wire = sheet.getWireByUuid(this.data.args.uuid);
    this.data.json = Utils.stringify({
      nodes: [],
      wires: [wire],
      sheetId: this.data.args.sheetId,
    });
    sheet.deleteWireByUuidInSheet(this.data.args.uuid, this.data.args.sheetId);
  }
  undo() {
    const sheet = this.store.getSheetByUuid(this.data.args.sheetId);
    sheet.parseInteractionJson(this.data.json);
  }
  getDetailData() {
    return [
      this.data.sheetName,
      this.data.nodeTypes.map((v) => Utils.encryptString(v)),
      this.data.socketTypes.map((v) => Utils.encryptString(v)),
    ].flat();
  }
}
