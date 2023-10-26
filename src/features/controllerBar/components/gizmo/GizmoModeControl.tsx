import { FormEvent } from "react";
import { styled } from "styled-components";
import { observer } from "mobx-react";

import RadioInput from "@/features/controllerBar/components/gizmo/RadioInput";
import { GIZMO_MODE } from "@/features/controllerBar/constants/gizmo";
import controllerBarStore from "@/features/controllerBar/store/controllerBarStore";
import { GizmoModeType } from "@/features/controllerBar/types/gizmo";

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

const GizmoModeControl = () => {
  const { gizmoMode, setGizmoMode } = controllerBarStore;

  const handleChange = (e: FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLInputElement;
    setGizmoMode(target.value as GizmoModeType);
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
};

const Observer = observer(GizmoModeControl);
export default Observer;

const Wrapper = styled.div`
  padding-right: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
