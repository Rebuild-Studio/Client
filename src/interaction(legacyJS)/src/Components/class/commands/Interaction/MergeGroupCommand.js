import Command from "../Command";
import * as Utils from "../../event-system/utils";
import InteractionHierachyVM from "../../../view_models/05. Hierarchy/InteractionHierarchy_VM";

export default class MergeGroupCommand extends Command {
  constructor(store, sheetId, groups, nodes) {
    super(store);
    this.type = "MergeGroupCommand";
    const sheet = this.store.getSheetByUuid(sheetId);
    this.data = {
      sheetId,
      groups,
      nodes,
      object: undefined,
      subjectNodes: undefined,
      subjectGroups: undefined,
      json: undefined,
      sheetName: sheet.name,
    };
    this.name =
      this.data.nodes.length > 0 ? "MergeNodeAndGroupCommand" : this.type;
    this.data.nodeTypes = this.data.nodes?.map(
      (uuid) => sheet.getNodeByUuid(uuid).type
    );
    this.data.groupNames = this.data.groups?.map(
      (uuid) => sheet.getGroupByUuid(uuid).name
    );
  }
  execute() {
    const sheet = this.store.getSheetByUuid(this.data.sheetId);
    if (!this.data.object) {
      this.data.object = this.data.groups.slice(0, 1)[0];
    }
    if (!this.data.subjectNodes) {
      this.data.subjectNodes = this.data.nodes.slice();
      this.data.subjectGroups = this.data.groups.slice(1);
      this.data.subjectGroups.forEach((group) =>
        this.data.subjectNodes.push(...sheet.getChildrenOfGroup(group))
      );
    }
    if (!this.data.json) {
      const groups = this.data.groups.map((group) =>
        sheet.getGroupByUuid(group)
      );
      this.data.json = Utils.stringify({ groups: groups });
    }
    this.data.subjectGroups.forEach((uuid) => sheet.deleteGroupByUuid(uuid));
    sheet.mergeGroup(this.data.object, this.data.subjectNodes);
    // sheet.setGroupName(
    //   this.data.object,
    //   this.store.stringStore.string("MergedGroupName")
    // );
    sheet.clearSelectedNodes();

    // Update the nodesAndGroups array in the store
    InteractionHierachyVM.InteractionHierachyListFilter();
  }
  undo() {
    const sheet = this.store.getSheetByUuid(this.data.sheetId);
    this.data.groups.forEach((group) => {
      sheet.deleteGroupByUuid(group);
    });
    sheet.parseInteractionJson(this.data.json);

    // Update the nodesAndGroups array in the store
    InteractionHierachyVM.InteractionHierachyListFilter();
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
