import { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import ReactFlow, {
  MiniMap,
  Node,
  NodeDragHandler,
  useNodesState,
  useOnSelectionChange
} from 'reactflow';
import 'reactflow/dist/style.css';
import styled from 'styled-components';
import ChangeNodesPositionCommand from '@/features/interaction/commands/change-nodes-position.ts';
import { executeCommand } from '@/features/interaction/commands/execute.ts';
import SelectNodesCommand from '@/features/interaction/commands/select-nodes.ts';
import InteractionNode from '@/features/interaction/components/nodes/InteractionNode';
import { arraysEqual } from '@/features/interaction/utils/arrays-equal.ts';
import { transformNodesToReactFlowFormat } from '@/features/interaction/utils/react-flow';
import DeleteNodeAndGroupCommand from '@/interaction(legacyJS)/src/Components/class/commands/Interaction/DeleteNodeAndGroupCommand.js';
import { eventSystem_store } from '@/interaction(legacyJS)/src/Components/stores/Interaction_Stores.js';

const nodeTypes = { interaction: InteractionNode };

const InteractionCanvas = () => {
  const nodeData = eventSystem_store.nodes;
  const sheet = eventSystem_store.getSelectedSheet();
  const [nodes, setNodes, onNodesChange] = useNodesState(
    transformNodesToReactFlowFormat(nodeData)
  );
  const prevPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([]);

  useOnSelectionChange({
    onChange: ({ nodes }) => {
      setSelectedNodeIds(nodes.map((node) => node.id));
    }
  });

  const handleSelectionEnd = () => {
    if (
      selectedNodeIds.length &&
      !arraysEqual(selectedNodeIds, eventSystem_store.selectedNodes)
    ) {
      executeCommand(new SelectNodesCommand(selectedNodeIds));
    }
  };

  const handleNodeDragStart: NodeDragHandler = (_event, node, _nodes) => {
    prevPosition.current = node.position;
  };

  const handleNodeDragStop: NodeDragHandler = (_event, node, _nodes) => {
    // Selection
    if (
      selectedNodeIds.length &&
      !arraysEqual(selectedNodeIds, eventSystem_store.selectedNodes)
    ) {
      executeCommand(new SelectNodesCommand(selectedNodeIds));
    }

    // Position
    const movementX = node.position.x - prevPosition.current.x;
    const movementY = node.position.y - prevPosition.current.y;
    if (movementX !== 0 || movementY !== 0) {
      executeCommand(new ChangeNodesPositionCommand(movementX, movementY));
    }
  };

  const onNodesDelete = (nodes: Node[]) => {
    const uuids = nodes.map((node: Node) => node.id);
    executeCommand(
      new DeleteNodeAndGroupCommand(
        eventSystem_store,
        sheet.uuid,
        sheet.selectedGroups,
        uuids
      )
    );
  };

  useEffect(() => {
    setNodes(transformNodesToReactFlowFormat(nodeData));
  }, [nodeData.length]);

  console.log([...nodes]);

  return (
    <Wrapper>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        onNodesChange={onNodesChange}
        onNodeDragStart={handleNodeDragStart}
        onNodeDragStop={handleNodeDragStop}
        onSelectionEnd={handleSelectionEnd}
        onNodesDelete={onNodesDelete}
      >
        <MiniMap zoomable pannable />
      </ReactFlow>
    </Wrapper>
  );
};

const Observer = observer(InteractionCanvas);
export default Observer;

const Wrapper = styled.div`
  height: 100%;
`;
