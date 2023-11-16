import { Node } from 'reactflow';
import { InteractionNodeData } from '@/interaction-canvas/type.ts';

/**
 *
 * @description
 * 기존의 구조를 그대로 유지하되,
 * react-flow에서 "data" 속성에 넣어주어야 CustomNode에서 사용할 수 있음.
 */
export const transformNodesToReactFlowFormat = (
  originalNodes: InteractionNodeData[]
): Node[] => {
  const reactFlowNodes = originalNodes.map((node: InteractionNodeData) => {
    return {
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
      selectable: true
    };
  });

  return reactFlowNodes;
};
