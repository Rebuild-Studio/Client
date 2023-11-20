import { interactionhistory_store } from '@/interaction(legacyJS)/src/Components/stores/Interaction_Stores';
import Command from './command.ts';

export const executeCommand = (command: Command) => {
  interactionhistory_store.execute(command);
};
