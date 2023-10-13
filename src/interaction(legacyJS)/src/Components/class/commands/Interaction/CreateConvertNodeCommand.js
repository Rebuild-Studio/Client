import Command from "../Command";
import * as Utils from "../../event-system/utils";

export default class CreateConvertNodeCommand extends Command {
  constructor(store, args) {
    const { uuids, from, to, position, convertType, sheetId } = args;
    super(store);
    this.type = "CreateConvertNodeCommand";
    const sheet = this.store.getSheetByUuid(sheetId);
    const sockets = uuids.map((uuid) => sheet.getSocketByUuid(uuid));
    this.data = {
      args: {
        type: "Convert",
        uuid: undefined,
        sheetId,
      },
      uuids: uuids,
      from: from,
      to: to,
      position: position,
      convertType: convertType,
      nodeTypes: sockets.map((socket) => sheet.getNodeByUuid(socket.node).type),
      socketTypes: sockets.map((socket) => socket.name),
      json: undefined,
      beforeJson: undefined,
      afterJson: undefined,
      sheetName: sheet.name,
    };
  }
  execute() {
    const sheet = this.store.getSheetByUuid(this.data.args.sheetId);
    if (this.data.json) {
      sheet.parseInteractionJson(this.data.json);
    } else {
      // 변환 노드 생성
      console.log(this.data.position);
      const node = sheet.createNodeByTypeInSheet(this.data.args);
      sheet.clearSelectedNodes();
      sheet.clearSelectedGroups();
      sheet.selectNode(node.uuid);
      sheet.setNodePosition(node.uuid, this.data.position);
      console.log(sheet.getNodePosition(node.uuid));
      sheet.convertSockets(
        node.uuid,
        "convert",
        this.data.convertType,
        "Convert"
      );
      // 와이어 연결
      const wire1 = sheet.createWireByUuidInSheet(
        [this.data.uuids[0], node.inputSockets[this.data.from].uuid],
        this.data.args.sheetId
      );
      const wire2 = sheet.createWireByUuidInSheet(
        [node.outputSockets[this.data.to].uuid, this.data.uuids[1]],
        this.data.args.sheetId
      );

      this.data.args.uuid = node.uuid;
      this.data.json = Utils.stringify({
        nodes: [node],
        wires: [wire1, wire2],
        sheetId: this.data.args.sheetId,
      });
    }
  }
  undo() {
    const sheet = this.store.getSheetByUuid(this.data.args.sheetId);
    sheet.deleteNodesByUuidInSheet(
      [this.data.args.uuid],
      this.data.args.sheetId
    );
    sheet.clearSelectedNodes();
    sheet.clearSelectedGroups();
    this.data.uuids.forEach((uuid) => sheet.selectNodeOrGroup(uuid));
  }
  getDetailData() {
    return [this.data.sheetName, Utils.encryptString(this.data.args.type)];
  }
}
