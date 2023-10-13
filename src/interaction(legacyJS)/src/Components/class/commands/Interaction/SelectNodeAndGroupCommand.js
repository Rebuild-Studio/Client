import Command from "../Command";
import * as Utils from "../../event-system/utils";

export default class SelectNodeAndGroupCommand extends Command {
  constructor(store, uuid, clearNode, clearGroup, sheetId) {
    super(store);
    this.type = "SelectNodeAndGroupCommand";
    const sheet = this.store.getSheetByUuid(sheetId);
    this.data = {
      sheetId,
      uuid: uuid,
      selected: undefined,
      clearNode: clearNode,
      clearGroup: clearGroup,
      selectedGroups: undefined,
      selectedNodes: undefined,
      sheetName: sheet.name,
    };
    const node = sheet.getNodeByUuid(this.data.uuid);
    if (node) {
      this.name = "SelectNodeCommand";
      this.data.nodeType = node.type;
    } else {
      const group = sheet.getGroupByUuid(this.data.uuid);
      if (group) {
        if (this.store.selectedGroups.includes(this.data.uuid)) {
          this.name = "ClearSelectionInGroupCommand";
        } else {
          this.name = "SelectGroupCommand";
        }
        this.data.groupName = group.name;
      } else {
        this.name = "ClearSelectionCommand";
      }
    }
  }
  execute() {
    const sheet = this.store.getSheetByUuid(this.data.sheetId);
    if (this.data.clearNode) {
      this.data.selectedNodes = sheet.clearSelectedNodes();
    }
    if (this.data.clearGroup) {
      this.data.selectedGroups = sheet.clearSelectedGroups();
    }
    if (this.data.uuid) {
      sheet.selectNodeOrGroup(this.data.uuid);
    }
  }
  undo() {
    const sheet = this.store.getSelectedSheet();
    if (this.data.uuid) {
      sheet.unselectNodeOrGroup(this.data.uuid);
    }
    if (this.data.clearGroup) {
      sheet.selectGroups(this.data.selectedGroups);
    }
    if (this.data.clearNode) {
      sheet.selectNodes(this.data.selectedNodes);
    }
  }
  getDetailData() {
    const ret = [this.data.sheetName];
    if (this.data.nodeType) {
      ret.push(Utils.encryptString(this.data.nodeType));
    } else if (this.data.groupName) {
      ret.push(this.data.groupName);
    }
    return ret;
  }
}
