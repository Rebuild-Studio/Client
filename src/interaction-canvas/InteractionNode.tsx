import { Handle, NodeProps, Position } from 'reactflow';
import styled from 'styled-components';
import NodeReferenceSelector from '@/interaction(legacyJS)/src/Components/views/02. Studio/04. EventPanel/node/Body/NodeReferenceSelector_V.jsx';
import { InteractionNodeData } from '@/interaction-canvas/type.ts';

export default function InteractionNode({
  data
}: NodeProps<InteractionNodeData>) {
  return (
    <Wrapper>
      <Header>
        <span>{data.name}</span>
      </Header>
      {Object.entries(data.inputSockets).map(([_, socket]) => (
        <Body key={socket.uuid}>
          <Handle type="target" position={Position.Left} id={socket.uuid} />
          <span>{socket.key}</span>
          {socket.reference && (
            <NodeReferenceSelector reference={socket.reference} />
          )}
        </Body>
      ))}
      {Object.entries(data.outputSockets).map(([_, socket]) => (
        <Body key={socket.uuid}>
          <Handle type="source" position={Position.Right} id={socket.uuid} />
          {socket.reference && (
            <NodeReferenceSelector reference={socket.reference} />
          )}
          <span>{socket.key}</span>
        </Body>
      ))}
      {data.referenceParameter &&
        Object.entries(data.referenceParameter).map(([_, reference]) => (
          <Body key={reference.name}>
            <NodeReferenceSelector reference={reference} />
            <span>{reference.type}</span>
          </Body>
        ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
`;

const Header = styled.div`
  background-color: #272749;
  color: white;
  padding: 4px 12px;
  border-radius: 10px 10px 0 0;
`;

const Body = styled.div`
  position: relative;
  display: flex;
  background-color: #393939;
  padding: 14px 18px;

  & > span {
    color: white;
    margin-left: 20px;
  }
`;
