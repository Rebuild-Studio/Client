import { styled } from "styled-components";

import ObjectFocus from "@components/ControllerBar/focus/ObjectFocus";
import GizmoMode from "@components/ControllerBar/gizmo/GizmoMode";
import SnapMode from "@components/ControllerBar/snap/SnapMode";
import { bgColors } from "@resources/colors/colors";

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
  position: fixed;
  bottom: 4%;
  left: 50%;
  transform: translateX(-50%);
`;

const Group = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  border-radius: 4px;
  padding: 3px;
  background-color: ${bgColors["1c1c1c"]};
`;
