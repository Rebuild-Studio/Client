import Command from '@/interaction(legacyJS)/src/Components/class/commands/Command';
import { eventSystem_store } from '@/interaction(legacyJS)/src/Components/stores/Interaction_Stores';

export default class SelectNodesCommand extends Command {
  sheet: any;
  previousUUIDs: string[];
  currentUUIDs: string[];

  constructor(uuids: string[]) {
    super(eventSystem_store);
    this.name = 'SelectNodesCommand';
    this.type = 'SelectNodesCommand';
    this.sheet = eventSystem_store.getSheetByUuid(
      eventSystem_store.selectedSheet
    );
    this.previousUUIDs = this.sheet.selectedNodes;
    this.currentUUIDs = uuids;
  }

  execute() {
    this.sheet.selectedNodes = this.currentUUIDs;
  }

  undo() {
    this.sheet.selectedNodes = this.previousUUIDs;
  }
}
