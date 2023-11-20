import { Node } from 'reactflow';
import { InteractionNodeData } from '@/features/interaction/types/interaction-node.ts';
import { eventSystem_store } from '@/interaction(legacyJS)/src/Components/stores/Interaction_Stores.js';

export const transformNodesToReactFlowFormat = (
  originalNodes: InteractionNodeData[]
): Node[] => {
  const { selectedNodes } = eventSystem_store;

  return originalNodes.map((node: InteractionNodeData) => ({
    id: node.uuid,
    type: 'interaction',
    data: {
      name: node.name,
      inputSockets: node.inputSockets,
      outputSockets: node.outputSockets,
      referenceParameter: node.referenceParameter,
      control: node.control
    },
    position: {
      x: node.position[0],
      y: node.position[1]
    },
    selectable: true,
    selected: selectedNodes.includes(node.uuid)
  }));
};
