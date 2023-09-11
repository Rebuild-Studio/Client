import { useState } from "react";
import styled from "styled-components";
import { basicColors, grayColors } from "@/resources/colors/colors";

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const SwitchLabel = styled.label`
  margin-right: 8px;
  user-select: none;
`;
const SwitchWrapper = styled.div`
  position: relative;
`;

const SwitchInput = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  width: 22px;
  height: 12px;
  background-color: ${grayColors.lightGray};
  border-radius: 15px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s;
  &:checked {
    background-color: ${basicColors.primary};
  }
`;

const SwitchLever = styled.div<{ checked: boolean }>`
  width: 10px;
  height: 10px;
  background-color: ${grayColors.buttonColor};
  outline: none;
  border-radius: 50%;
  position: absolute;
  top: 4px;
  left: 1px;
  transition: transform 0.3s;
  transform: ${(props) =>
    props.checked ? "translateX(14px)" : "translateX(3px)"};
`;

interface SwitchProps {
  label: string;
}

const Switch = ({ label }: SwitchProps) => {
  const [checked, setChecked] = useState(false);

  const handleSwitchChange = () => {
    setChecked(!checked);
  };

  return (
    <SwitchContainer>
      <SwitchLabel>{label}</SwitchLabel>
      <SwitchWrapper>
        <SwitchInput
          type="checkbox"
          checked={checked}
          onChange={handleSwitchChange}
        />
        <SwitchLever checked={checked} onClick={handleSwitchChange} />
      </SwitchWrapper>
    </SwitchContainer>
  );
};

export default Switch;
