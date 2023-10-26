import { ChangeEvent, useState } from 'react';
import { styled } from 'styled-components';

import CheckboxIcon from '@/features/controllerBar/components/icons/CheckboxIcon';

interface Props {
  value: string;
  name: string;
}

const Checkbox = ({ value, name }: Props) => {
  const [checked, setChecked] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  return (
    <label htmlFor={value} key={value}>
      <InputWrapper>
        <CheckboxInput
          id={value}
          name={value}
          type="checkbox"
          value={value}
          onChange={handleChange}
        />
        <CheckboxIcon checked={checked} />
        <span>{name}</span>
        {value === 'grid' && <Shortcut>G</Shortcut>}
        {value === 'rotate' && <Shortcut>A</Shortcut>}
      </InputWrapper>
    </label>
  );
};

export default Checkbox;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;

  & > span {
    margin-left: 10px;
  }
`;

const CheckboxInput = styled.input`
  display: none;
`;

const Shortcut = styled.span`
  color: grey;
  position: absolute;
  right: 12px;
`;
