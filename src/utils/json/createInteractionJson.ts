import { eventSystem_store } from '@/interaction(legacyJS)/src/Components/stores/Interaction_Stores';
import { InteractionJson } from '@/types/interaction/interaction';

const createInteractionJson = () => {
  const interactionJson: InteractionJson = JSON.parse(
    JSON.stringify(eventSystem_store.toJSON())
  );
  return interactionJson;
};

export default createInteractionJson;
