import { FormEvent } from "react";
import { styled } from "styled-components";
import { observer } from "mobx-react-lite";

import controllerBarStore, { GIZMO_MODE } from "@store/controllerBarStore";
import RadioInput from "@components/ControllerBar/gizmo/RadioInput";

const GIZMO_OPTIONS = [
  {
    value: GIZMO_MODE.GLOBAL,
    name: "글로벌",
  },
  {
    value: GIZMO_MODE.LOCAL,
    name: "로컬",
  },
];

const GizmoModeControl = observer(() => {
  const { gizmoMode, setGizmoMode } = controllerBarStore;

  const handleChange = (e: FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLInputElement;
    setGizmoMode(target.value as GIZMO_MODE);
  };

  return (
    <Wrapper>
      <Form onChange={handleChange}>
        {GIZMO_OPTIONS.map((option) => (
          <RadioInput
            key={option.value}
            value={option.value}
            name={option.name}
            radioGroup="gizmo-mode"
            selected={option.value === gizmoMode}
          />
        ))}
      </Form>
    </Wrapper>
  );
});

export default GizmoModeControl;

const Wrapper = styled.div`
  padding-right: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
