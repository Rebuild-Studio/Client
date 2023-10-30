import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { basicColors, grayColors } from '@/resources/colors/colors';

interface SwitchProps {
  label?: string;
  checked: boolean;
  onChange: (e: boolean) => void;
  onClick?: (e: boolean) => void;
}

const Switch = ({ label, checked, onChange }: SwitchProps) => {
  const [isChecked, setIsChecked] = useState(checked);
  const handleSwitchChange = () => {
    onChange(!isChecked);
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  return (
    <SwitchContainer $hasLabel={!!label}>
      {label && <SwitchLabel>{label}</SwitchLabel>}
      <SwitchWrapper>
        <SwitchInput
          type="checkbox"
          checked={isChecked}
          onChange={handleSwitchChange}
        />
        <SwitchLever $checked={isChecked} onClick={handleSwitchChange} />
      </SwitchWrapper>
    </SwitchContainer>
  );
};

export default Switch;

const SwitchContainer = styled.div<{ $hasLabel: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${({ $hasLabel }) => ($hasLabel ? '100%' : 'fit-content')};
`;

const SwitchLabel = styled.label`
  font-size: 10px;
  margin-right: 8px;
  user-select: none;
`;

const SwitchWrapper = styled.div`
  position: relative;
`;

const SwitchInput = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  cursor: pointer;
  width: 22px;
  height: 12px;
  background-color: ${grayColors.lightGray};
  border-radius: 15px;
  position: relative;
  transition: background-color 0.3s;
  &:checked {
    background-color: ${basicColors.primary};
  }
`;

const SwitchLever = styled.div<{ $checked: boolean }>`
  cursor: pointer;
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
    props.$checked ? 'translateX(14px)' : 'translateX(3px)'};
`;
