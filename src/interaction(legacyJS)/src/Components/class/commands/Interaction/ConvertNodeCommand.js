import Command from "../Command";
import * as Utils from "../../event-system/utils";

export default class ConvertNodeCommand extends Command {
  constructor(store, args) {
    const { uuid, key, value, type, sheetId } = args;
    super(store);
    this.type = "ConvertNodeCommand";
    this.name = "SetNodeDataCommand";
    const sheet = this.store.getSheetByUuid(sheetId);
    this.data = {
      args: {
        sheetId,
      },
      uuid: uuid,
      key: key,
      value: value,
      type: type,
      beforeJson: undefined,
      afterJson: undefined,
      sheetName: sheet.name,
      nodeType: sheet.getNodeByUuid(uuid).type,
    };
  }
  execute() {
    const sheet = this.store.getSheetByUuid(this.data.args.sheetId);
    if (!this.data.afterJson) {
      //redo
      const node = sheet.getNodeByUuid(this.data.uuid);
      const before = {
        nodes: [node],
        wires: sheet.getWiresInNode(node),
      };
      this.data.beforeJson = Utils.stringify(before);
      //변환 전의 노드와 와이어를 기억
      sheet.convertSockets(
        this.data.uuid,
        this.data.key,
        this.data.value,
        this.data.type
      );
    } else {
      //소켓 타입을 바꾸는 경우 노드와 연관된 와이어를 모두 삭제해야함.
      //스토어 메소드에서 소켓 및 와이어 삭제 로직 포함됨
      const node = sheet.getNodeByUuid(this.data.uuid);
      const wires = sheet.getWiresInNode(node);
      sheet.deleteWires(wires);
      sheet.parseInteractionJson(this.data.afterJson);
    }
  }
  undo() {
    const sheet = this.store.getSheetByUuid(this.data.args.sheetId);
    const node = sheet.getNodeByUuid(this.data.uuid);
    const after = {
      nodes: [node],
    };
    this.data.afterJson = Utils.stringify(after);
    sheet.parseInteractionJson(this.data.beforeJson);
    //변환된 노드의 값을 변환 전의 값으로 복구
    //삭제된 와이어를 재생성
  }
  getDetailData() {
    return [this.data.sheetName, Utils.encryptString(this.data.nodeType)];
  }
}
