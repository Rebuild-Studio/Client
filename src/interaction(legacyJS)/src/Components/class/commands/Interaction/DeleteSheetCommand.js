import Command from "../Command";
import * as Utils from "../../event-system/utils";

export default class DeleteSheetCommand extends Command {
  constructor(store, uuid) {
    super(store);
    this.type = "DeleteSheetCommand";
    this.name = this.type;
    this.data = {
      uuid: uuid,
      selected: uuid === this.store.selectedSheet,
      order: this.store.sheetOrder.indexOf(uuid),
      sheetName: undefined,
      json: undefined,
    };
  }
  execute() {
    /**
     * Todo
     * 모든 노드들의 정보와 와이어 정보를 Json
     */
    const sheet = this.store.getSheetByUuid(this.data.uuid);
    const nodes = sheet.nodes;
    const wires = sheet.wires;
    const groups = sheet.groups;

    if (!this.data.json)
      this.data.json = Utils.stringify({
        nodes,
        wires,
        groups,
      });

    this.data.sheetName = sheet.name;
    this.store.deleteSheet(this.data.uuid);
  }

  undo() {
    /**
     * Todo
     * Json을 토대로 create
     */
    const sheet = this.store.createSheet({
      name: this.data.sheetName,
      uuid: this.data.uuid,
    });

    /**
     * Note
     * 그룹 파싱은 그룹 작업이 끝나면 적용
     * 시트 간 순서, 오더 작업이 끝나면 적용
     */
    sheet.parseInteractionJson(this.data.json);
    this.store.setSheetOrder({
      uuid: sheet.uuid,
      order: this.data.order,
    });
    if (this.data.selected) {
      this.store.setSelectedSheet(sheet.uuid);
    }
  }

  getDetailData() {
    return [this.data.sheetName];
  }
}
