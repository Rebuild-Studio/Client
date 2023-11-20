import { eventSystem_store } from '@/interaction(legacyJS)/src/Components/stores/Interaction_Stores.js';
import Command from './command.ts';

export default class ChangeNodesPositionCommand extends Command {
  sheet: any;
  movement: [number, number];
  moved: [number, number];
  targetNodes: string[];
  sheetName: string;
  targetGroups: string[];

  constructor(movementX: number, movementY: number) {
    super(eventSystem_store);
    this.name = 'ChangeNodesPositionCommand';
    this.type = 'ChangeNodesPositionCommand';
    this.updatable = true;
    this.sheet = eventSystem_store.getSheetByUuid(
      eventSystem_store.selectedSheet
    );
    this.movement = [movementX, movementY];
    this.moved = this.movement;
    this.targetNodes = this.sheet.selectedNodes.slice();
    this.sheetName = this.sheet.name;
    this.targetGroups = this.sheet.selectedGroups
      .slice()
      .filter((groupuuid: string) => {
        return !this.targetNodes.some((node) =>
          this.sheet.getChildrenOfGroup(groupuuid).includes(node)
        );
      });
  }

  execute() {
    this.sheet.addNodesPosition(this.targetNodes, this.movement);
    this.sheet.addGroupsPosition(this.targetGroups, this.movement);
  }

  undo() {
    this.movement = this.moved;
    const position = this.moved.map((m) => m * -1);
    this.sheet.addNodesPosition(this.targetNodes, position);
    this.sheet.addGroupsPosition(this.targetGroups, position);
  }

  update(cmd: ChangeNodesPositionCommand) {
    this.movement = cmd.movement;
    this.moved = this.moved.map((m, i) => m + cmd.movement[i]) as [
      number,
      number
    ];
  }

  getDetailData() {
    return [this.sheetName, this.moved.map((v) => v.toString())].flat();
  }
}
