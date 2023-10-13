import Command from "../Command";
import * as Utils from "../../event-system/utils";

/**
 * `CreateNodeCommand` is a class that represents a command to create a node on a sheet.
 * This command encapsulates the entire logic required for creating a node,
 * saving the state for undo functionality, and performing the undo operation.
 *
 * @extends Command
 */

export default class CreateNodeCommand extends Command {
  constructor(store, { node, sheetId }) {
    super(store);
    this.type = "CreateNodeCommand";
    const sheet = this.store.getSheetByUuid(sheetId);
    this.data = {
      nodeCreationInfo: {
        node: node,
        uuid: "",
        sheetId,
        name: this.store.uniqueNodeTypeName(sheet, node.NODE_TYPE),
      },
      uuids: "",
      json: "",
      sheetName: this.store.getSheetByUuid(sheetId).name,
    };
  }

  /**
   * If a serialized node state (in JSON format) already exists, will parse it and use it.
   * Otherwise, it creates a new node, manages selections, and saves the created state.
   */
  execute() {
    const sheet = this.store.getSheetByUuid(this.data.nodeCreationInfo.sheetId);
    if (this.data.json) {
      sheet.parseInteractionJson(this.data.json);
    } else {
      const node = sheet.createNodeWithNodeClass(this.data.nodeCreationInfo);
      this.data.uuids = [
        ...sheet.clearSelectedNodes(),
        ...sheet.clearSelectedGroups(),
      ];
      sheet.selectNode(node.uuid);
      this.data.nodeCreationInfo.uuid = node.uuid;
      this.data.json = Utils.stringify({
        nodes: [node],
        wires: [],
        sheetId: this.data.nodeCreationInfo.sheetId,
      });
    }
  }

  /**
   * Undoes the node creation by deleting the created node from the sheet,
   * and restoring previous selections so that the user can continue working on (previously)selected nodes.
   */
  undo() {
    const sheet = this.store.getSheetByUuid(this.data.nodeCreationInfo.sheetId);
    sheet.deleteNodesByUuidInSheet(
      [this.data.nodeCreationInfo.uuid],
      this.data.nodeCreationInfo.sheetId
    );
    sheet.clearSelectedNodes();
    sheet.clearSelectedGroups();
    this.data.uuids.forEach((uuid) => sheet.selectNodeOrGroup(uuid));
  }

  getDetailData() {
    return [this.data.sheetName, Utils.encryptString(this.data.nodeCreationInfo.node.type)];
  }
}
