import { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import ReactFlow, {
  MiniMap,
  NodeChange,
  NodePositionChange,
  OnConnect,
  OnNodesChange,
  addEdge,
  useEdgesState,
  useNodesState
} from 'reactflow';
import 'reactflow/dist/style.css';
import storeContainer from '@/interaction(legacyJS)/src/Components/stores/storeContainer.js';
import initialEdges from './edges.ts';
import { nodeTypes, transformNodesToReactFlowFormat } from './nodes.ts';

const Flow = () => {
  const { eventSystem_store } = storeContainer;
  const selectedSheet = eventSystem_store.getSelectedSheet();
  const legacyNodes = eventSystem_store.getSelectedSheet().nodes;
  const [nodes, setNodes, _] = useNodesState([]); // React Flow에서 노드 위치 관리
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    const updatedNodes = transformNodesToReactFlowFormat(legacyNodes);
    setNodes(updatedNodes);
  }, [legacyNodes.length, setNodes]);

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const hanldeNodeChange: OnNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((currentNodes) => {
        const updatedNodes = [...currentNodes];
        changes.forEach((change) => {
          if (isNodePositionChangeType(change)) {
            const nodeIndex = updatedNodes.findIndex(
              (node) => node.id === change.id
            );
            if (nodeIndex >= 0 && change.position) {
              // NodePositionChange 타입의 change를 찾으면 노드 위치 업데이트
              // legacy node구조에서 해당하는 노드를 찾고 새로운 position을 업데이트
              selectedSheet
                .getNodeByUuid(change.id)
                .setPosition([change.position.x, change.position.y]);
              updatedNodes[nodeIndex] = {
                ...updatedNodes[nodeIndex],
                position: change.position
              };
            }
          }
        });
        return updatedNodes;
      });
    },
    [setNodes, selectedSheet]
  );

  return (
    <div style={{ width: '90vw', height: '90vh', backgroundColor: 'black' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={hanldeNodeChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <MiniMap zoomable pannable />
      </ReactFlow>
    </div>
  );
};

const Observer = observer(Flow);
export default Observer;

const isNodePositionChangeType = (
  change: NodeChange
): change is NodePositionChange => {
  return 'position' in change;
};
