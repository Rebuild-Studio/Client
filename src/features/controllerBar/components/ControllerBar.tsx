import { styled } from 'styled-components';

import ObjectFocus from '@/features/controllerBar/components/focus/ObjectFocus';
import GizmoMode from '@/features/controllerBar/components/gizmo/GizmoMode';
import SnapMode from '@/features/controllerBar/components/snap/SnapMode';
import { bgColors } from '@resources/colors/colors';

const ControllerBar = () => {
  return (
    <Wrapper>
      <Group>
        <ObjectFocus />
      </Group>
      <Group>
        <GizmoMode />
        <SnapMode />
      </Group>
    </Wrapper>
  );
};

export default ControllerBar;

const Wrapper = styled.section`
  display: flex;
  gap: 8px;
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9;
`;

const Group = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  border-radius: 4px;
  padding: 3px;
  background-color: ${bgColors['1c1c1c']};
`;
