import { Handle, Position } from 'reactflow';
import styled from 'styled-components';
import { Socket } from '@/features/interaction/types/interaction-node';
import NodeReferenceSelector from '@/interaction(legacyJS)/src/Components/views/02. Studio/04. EventPanel/node/Body/NodeReferenceSelector_V.jsx';

interface Props {
  sockets: Socket[];
  type: 'input' | 'output';
}

export default function Sockets({ sockets, type }: Props) {
  return sockets.map((socket) => (
    <SocketWrapper key={socket.uuid}>
      <StyledHandle
        $position={type === 'input' ? 'left' : 'right'}
        id={socket.uuid}
        type={type === 'input' ? 'target' : 'source'}
        position={type === 'input' ? Position.Left : Position.Right}
      />
      <ReferenceWrapper $reverse={type === 'output'}>
        <span>{socket.key}</span>
        {socket.reference && (
          <NodeReferenceSelector reference={socket.reference} />
        )}
      </ReferenceWrapper>
    </SocketWrapper>
  ));
}

const SocketWrapper = styled.div`
  padding: 14px 0;
  position: relative;
`;

const ReferenceWrapper = styled.div<{ $reverse: boolean }>`
  display: flex;
  flex-direction: ${({ $reverse }) => ($reverse ? 'row-reverse' : 'row')};
  align-items: center;
  gap: 12px;
`;

const StyledHandle = styled(Handle)<{ $position: 'left' | 'right' }>`
  width: 20px;
  height: 20px;
  background-color: #ccd5ff;
  right: ${({ $position }) => ($position === 'right' ? '-30px' : undefined)};
  left: ${({ $position }) => ($position === 'left' ? '-30px' : undefined)};
  z-index: -1;

  &:hover {
    z-index: 0;
  }
`;
