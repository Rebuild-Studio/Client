import Command from "../Command";
import * as Utils from "../../event-system/utils";
import InteractionHierachyVM from "../../../view_models/05. Hierarchy/InteractionHierarchy_VM";

export default class ExcludeFromGroupCommand extends Command {
  constructor(store, sheetId, uuids) {
    super(store);
    this.type = "ExcludeFromGroupCommand";
    this.name = this.type;
    const sheet = this.store.getSheetByUuid(sheetId);
    this.data = {
      sheetId,
      targets: [
        ...uuids.map((uuid) => {
          return { groupId: null, uuid };
        }),
      ],
      sheetName: sheet.name,
      nodeTypes: uuids
        .map((uuid) => sheet.getNodeByUuid(uuid)?.type)
        .filter((v) => v),
    };

    // Update the nodesAndGroups array in the store
    InteractionHierachyVM.InteractionHierachyListFilter();
  }
  execute() {
    const sheet = this.store.getSheetByUuid(this.data.sheetId);
    this.data.targets.forEach(
      (target) => (target.groupId = sheet.excludeChildFromGroup(target.uuid))
    );
    sheet.clearSelectedGroups();
  }
  undo() {
    const sheet = this.store.getSheetByUuid(this.data.sheetId);
    this.data.targets.forEach((target) => {
      sheet.mergeGroup(target.groupId, [target.uuid]);
      sheet.selectGroup(target.groupId);
    });

    // Update the nodesAndGroups array in the store
    InteractionHierachyVM.InteractionHierachyListFilter();
  }
  getDetailData() {
    let intermediate = "";
    const nodeTypes = this.data.nodeTypes.map((v, i) => {
      intermediate += Utils.templateArg(i + 2) + ", ";
      return Utils.encryptString(v);
    });
    return [this.data.sheetName, intermediate.slice(0, -2), nodeTypes].flat();
  }
}
