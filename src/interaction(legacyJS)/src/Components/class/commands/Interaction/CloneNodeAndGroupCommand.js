import Command from "../Command";
import * as Utils from "../../event-system/utils";

export default class CloneNodeAndGroupCommand extends Command {
  constructor(store, sheetId, targetNodes, targetGroups) {
    super(store);
    this.type = "CloneNodeAndGroupCommand";
    const sheet = this.store.getSheetByUuid(sheetId);
    this.data = {
      sheetId,
      srcNodes: [],
      srcGroups: [],
      groupUuids: undefined,
      nodeUuids: undefined,
      json: undefined,
      sheetName: sheet.name,
    };
    const { srcGroups, srcNodes } = sheet.getToBeCloned(
      targetGroups,
      targetNodes
    );
    this.data.srcNodes = srcNodes;
    this.data.srcGroups = srcGroups;
    this.name =
      this.data.srcNodes.length > 0
        ? this.data.srcGroups.length > 0
          ? this.type
          : "CloneNodeCommand"
        : "CloneGroupCommand";
    this.data.nodeTypes = this.data.srcNodes?.map(
      (uuid) => sheet.getNodeByUuid(uuid).type
    );
    this.data.groupNames = this.data.srcGroups?.map(
      (uuid) => sheet.getGroupByUuid(uuid).name
    );
  }
  execute() {
    const sheet = this.store.getSheetByUuid(this.data.sheetId);
    if (this.data.json) {
      sheet.parseInteractionJson(this.data.json);
    } else {
      const cloned = sheet.cloneNodeAndGroup(
        this.data.srcGroups,
        this.data.srcNodes,
        this.store.stringStore.string("CopiedGroupName")
      );
      this.data.json = Utils.stringify(cloned);
      this.data.nodeUuids = cloned.nodes.map((node) => node.uuid);
      this.data.groupUuids = cloned.groups.map((group) => group.uuid);
    }
  }
  undo() {
    const sheet = this.store.getSheetByUuid(this.data.sheetId);
    sheet.deleteNodesByUuidInSheet(this.data.nodeUuids);
    sheet.deleteGroupsAndChildren(this.data.groupUuids);
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
