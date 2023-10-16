import Command from "../Command";
import * as Utils from "../../event-system/utils";

export default class CreateGroupCommand extends Command {
  constructor(store, sheetId, targetNodes) {
    super(store);
    this.type = "CreateGroupCommand";
    this.name = this.type;
    const sheet = this.store.getSheetByUuid(sheetId);
    this.data = {
      sheetId,
      targetNodes: targetNodes.slice(),
      groupUuid: undefined,
      name: this.store.uniqueGroupName(sheet),
      json: undefined,
      sheetName: sheet.name,
    };
  }
  execute() {
    const sheet = this.store.getSheetByUuid(this.data.sheetId);
    if (this.data.json) {
      sheet.parseInteractionJson(this.data.json);
    } else {
      const group = sheet.createGroup({ name: this.data.name });
      sheet.addChildrenToGroupByUuid(group.uuid, this.data.targetNodes);
      this.data.groupUuid = group.uuid;
      this.data.json = Utils.stringify({ groups: [group] });
      this.data.groupName = group.name;
    }
    sheet.clearSelectedGroups();
    sheet.clearSelectedNodes();
    sheet.selectGroups([this.data.groupUuid]);
  }
  undo() {
    const sheet = this.store.getSheetByUuid(this.data.sheetId);
    sheet.deleteGroupByUuid(this.data.groupUuid);
    sheet.clearSelectedGroups();
    sheet.clearSelectedNodes();
    sheet.selectNodes(this.data.targetNodes);
  }
  getDetailData() {
    return [this.data.sheetName, this.data.groupName];
  }
}
