import { NodeProps } from 'reactflow';
import styled from 'styled-components';
import References from '@/features/interaction/components/nodes/InteractionNode/References.tsx';
import Sockets from '@/features/interaction/components/nodes/InteractionNode/Sockets.tsx';
import { InteractionNodeData } from '@/features/interaction/types/interaction-node.ts';

export default function InteractionNode({
  data: { name, inputSockets, outputSockets, referenceParameter }
}: NodeProps<InteractionNodeData>) {
  return (
    <Wrapper>
      <Header>
        <span>{name}</span>
      </Header>
      <Body>
        <Sockets sockets={Object.values(inputSockets)} type={'input'} />
        <Sockets sockets={Object.values(outputSockets)} type={'output'} />
        {referenceParameter && (
          <References references={Object.values(referenceParameter)} />
        )}
      </Body>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  color: white;
`;

const Header = styled.div`
  background-color: #272749;
  padding: 8px 12px;
  border-radius: 10px 10px 0 0;
`;

const Body = styled.div`
  background-color: #393939;
  padding: 10px 20px;
  border-radius: 0 0 10px 10px;
`;
