import { Handle, Position } from 'reactflow';
import styled from 'styled-components';
import NodeReferenceSelector from '@/interaction(legacyJS)/src/Components/views/02. Studio/04. EventPanel/node/Body/NodeReferenceSelector_V.jsx';
import { CustomNodeData } from '@/react-flow/type.ts';

type CustomNodeProps = {
  id: string;
  data: CustomNodeData;
};

export default function CustomNode({ id, data }: CustomNodeProps) {
  return (
    <>
      <Wrapper key={id}>
        <Header>
          <span>{data.name}</span>
        </Header>
        {Object.entries(data.inputSockets).map(([key, socket]) => {
          return (
            <Body key={key + socket.uuid}>
              <Handle
                key={socket.uuid}
                type="target"
                position={Position.Left}
                id={socket.uuid}
              />
              <label htmlFor={'number'}>{socket.key}</label>
              {socket.reference && (
                <NodeReferenceSelector reference={socket.reference} />
              )}
            </Body>
          );
        })}
        {Object.entries(data.outputSockets).map(([key, socket]) => (
          <Body key={key + socket.uuid}>
            <Handle
              key={socket.uuid}
              type="source"
              position={Position.Right}
              id={socket.uuid}
            />
            {socket.reference && (
              <NodeReferenceSelector reference={socket.reference} />
            )}
            <label htmlFor={'number'}>{socket.key}</label>
          </Body>
        ))}
        {data.referenceParameter &&
          Object.entries(data.referenceParameter).map(([key, reference]) => (
            <Body key={key + reference.name}>
              <NodeReferenceSelector reference={reference} />
              <label htmlFor={'number'}>{reference.type}</label>
            </Body>
          ))}
      </Wrapper>
    </>
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
  //border-radius: 0 0 10px 10px;

  & > label {
    color: white;
    margin-left: 20px;
  }

  & > input {
    background-color: #282828;
    outline: none;
    border: none;
    padding: 4px;
    color: white;
  }
`;
