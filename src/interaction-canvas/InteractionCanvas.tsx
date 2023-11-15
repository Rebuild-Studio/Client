import { useCallback } from 'react';
import { reaction } from 'mobx';
import { observer } from 'mobx-react';
import ReactFlow, {
  MiniMap,
  NodeChange,
  OnConnect,
  OnNodesChange,
  addEdge,
  useEdgesState,
  useNodesState
} from 'reactflow';
import 'reactflow/dist/style.css';
import styled from 'styled-components';
import storeContainer from '@/interaction(legacyJS)/src/Components/stores/storeContainer.js';
import InteractionNode from '@/interaction-canvas/InteractionNode.tsx';
import initialEdges from './edges.ts';
import { transformNodesToReactFlowFormat } from './nodes.ts';

const nodeTypes = { interaction: InteractionNode };

const InteractionCanvas = () => {
  const { eventSystem_store } = storeContainer;
  const selectedSheet = eventSystem_store.getSelectedSheet();
  const nodeData = eventSystem_store.getSelectedSheet().nodes;
  const [nodes, setNodes, _] = useNodesState([]); // React Flow에서 노드 위치 관리
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  reaction(
    // 노드 데이터가 변경되면 React Flow에서 사용하는 노드 데이터로 변환
    // 그리고 reaction을 통해 화면에 그려주어야 함
    () => nodeData.length,
    () => {
      setNodes(transformNodesToReactFlowFormat(nodeData));
    }
  );

  const handleConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const hanldeNodeChange: OnNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((currentNodes) => {
        const updatedNodes = [...currentNodes];
        changes.forEach((change) => {
          switch (change.type) {
            case 'position':
              {
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
              break;
            case 'add':
              break;
            case 'remove':
              break;
            case 'select':
              break;
            case 'reset':
              break;
            case 'dimensions':
          }
        });
        return updatedNodes;
      });
    },
    [setNodes, selectedSheet]
  );

  return (
    <Wrapper>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={hanldeNodeChange}
        onEdgesChange={onEdgesChange}
        onConnect={handleConnect}
        nodeTypes={nodeTypes}
      >
        <StyledMiniMap zoomable pannable />
      </ReactFlow>
    </Wrapper>
  );
};

const Observer = observer(InteractionCanvas);
export default Observer;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledMiniMap = styled(MiniMap)`
  bottom: 70px !important;
  right: 0 !important;
`;
