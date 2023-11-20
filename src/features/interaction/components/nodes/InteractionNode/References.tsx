import styled from 'styled-components';
import { ReferenceParameter } from '@/features/interaction/types/interaction-node.ts';
import NodeReferenceSelector from '@/interaction(legacyJS)/src/Components/views/02. Studio/04. EventPanel/node/Body/NodeReferenceSelector_V.jsx';

interface Props {
  references: ReferenceParameter[];
}

export default function References({ references }: Props) {
  return references.map((reference) => (
    <Wrapper key={reference.name}>
      <NodeReferenceSelector reference={reference} />
      <span>{reference.type}</span>
    </Wrapper>
  ));
}

const Wrapper = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  gap: 14px;
  padding: 14px 0;
`;
