import { FormEvent } from "react";
import { styled } from "styled-components";
import { observer } from "mobx-react-lite";

import ActivateAxis from "@/features/controllerBar/components/snap/ActivateAxis";
import Checkbox from "@/features/controllerBar/components/snap/Checkbox";
import { grayColors } from "@resources/colors/colors";
import { SNAP_MODE } from "@/features/controllerBar/constants/snap";
import controllerBarStore from "@/features/controllerBar/store/controllerBarStore";
import { SnapModeType } from "@/features/controllerBar/types/snap";

const SNAP_OPTIONS = [
  { value: SNAP_MODE.GRID, name: "그리드 스냅" },
  { value: SNAP_MODE.ROTATE, name: "45° 회전 스냅" },
  { value: SNAP_MODE.SURFACE, name: "표면 스냅" },
];

const SnapModeControl = observer(() => {
  const { snapMode, toggleSnapMode } = controllerBarStore;

  const handleChange = (e: FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLInputElement;
    toggleSnapMode(target.value as SnapModeType);
  };

  return (
    <Wrapper>
      <Form onChange={handleChange}>
        {SNAP_OPTIONS.map((option) => (
          <CheckboxWrapper key={option.value}>
            <Checkbox value={option.value} name={option.name} />
            {option.value === SNAP_MODE.GRID && <Shortcut>G</Shortcut>}
            {option.value === SNAP_MODE.ROTATE && <Shortcut>A</Shortcut>}
          </CheckboxWrapper>
        ))}
      </Form>
      <ActivateAxis enabled={snapMode[SNAP_MODE.SURFACE]} />
    </Wrapper>
  );
});

export default SnapModeControl;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Shortcut = styled.span`
  color: ${grayColors["535353"]};
`;
