import Command from "../Command";
import * as Utils from "../../event-system/utils";

export default class DeleteNodeAndGroupCommand extends Command {
  constructor(store, sheetId, groupUuids, nodeUuids) {
    super(store);
    this.type = "DeleteNodeAndGroupCommand";
    const sheet = this.store.getSheetByUuid(sheetId);
    this.data = {
      groupUuids: groupUuids.slice(),
      nodeUuids: nodeUuids.slice(),
      sheetId,
      excluded: undefined,
      json: undefined,
      sheetName: sheet.name,
    };
    const nodes = this.data.nodeUuids.map((uuid) => sheet.getNodeByUuid(uuid));
    this.data.excluded = nodes
      .filter((node) => node.group)
      .map((node) => {
        return { group: node.group, node: node.uuid };
      });
    for (const node of nodes) {
      this.data.groupUuids = this.data.groupUuids.filter(
        (uuid) => uuid !== node.group
      );
    }
    this.name =
      this.data.nodeUuids.length > 0
        ? this.data.groupUuids.length > 0
          ? this.type
          : "DeleteSelectedNodeCommand"
        : "DeleteGroupCommand";
    this.data.nodeTypes = this.data.nodeUuids?.map(
      (uuid) => sheet.getNodeByUuid(uuid).type
    );
    this.data.groupNames = this.data.groupUuids?.map(
      (uuid) => sheet.getGroupByUuid(uuid).name
    );
  }
  execute() {
    const sheet = this.store.getSheetByUuid(this.data.sheetId);
    if (!this.data.json) {
      const nodes = this.data.nodeUuids.map((uuid) =>
        sheet.getNodeByUuid(uuid)
      );
      const groups = sheet.getGroupsDescendants(this.data.groupUuids);

      const wires = sheet.getWiresInNodes(nodes);

      groups.nodes.push(...nodes);
      groups.wires.push(...wires);
      this.data.json = Utils.stringify(groups);
    }
    sheet.deleteGroupsAndChildren(this.data.groupUuids);
    sheet.deleteNodesByUuidInSheet(this.data.nodeUuids);
    sheet.clearSelectedNodes();
    sheet.clearSelectedGroups();
  }
  undo() {
    const sheet = this.store.getSheetByUuid(this.data.sheetId);
    sheet.parseInteractionJson(this.data.json);
    this.data.excluded.forEach((rel) => {
      sheet.addChildrenToGroupByUuid(rel.group, [rel.node]);
    });
  }
  getDetailData() {
    let currentArgIndex =
      this.data.nodeTypes.length && this.data.groupNames.length ? 3 : 2;

    let intermediateN = "";
    const nodeTypes = this.data.nodeTypes?.map((v) => {
      intermediateN += Utils.templateArg(currentArgIndex) + ", ";
      currentArgIndex++;
      return Utils.encryptString(v);
    });

    let intermediateG = "";
    const groupNames = this.data.groupNames?.map((v) => {
      intermediateG += Utils.templateArg(currentArgIndex) + ", ";
      currentArgIndex++;
      return v;
    });

    const ret = [this.data.sheetName];
    if (intermediateN.length) {
      ret.push(intermediateN.slice(0, -2));
    }
    if (intermediateG.length) {
      ret.push(intermediateG.slice(0, -2));
    }
    ret.push(nodeTypes);
    ret.push(groupNames);
    return ret.flat();
  }
}
