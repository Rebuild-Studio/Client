import { styled } from "styled-components";

import RadioCheckedIcon from "../icons/radio-checked.svg?react";
import RadioUncheckedIcon from "../icons/radio-unchecked.svg?react";

interface Props {
  value: string;
  name: string;
  defaultValue: string;
  radioGroup: string;
}

const RadioInput = ({ value, name, defaultValue, radioGroup }: Props) => {
  return (
    <label htmlFor={value} key={value}>
      <InputWrapper>
        <Input
          id={value}
          type={"radio"}
          name={radioGroup}
          value={value}
          defaultChecked={value === defaultValue}
        />
        <div className={"radio-checked"}>
          <RadioCheckedIcon />
        </div>
        <div className={"radio-unchecked"}>
          <RadioUncheckedIcon />
        </div>
        <span>{name}</span>
      </InputWrapper>
    </label>
  );
};

export default RadioInput;
const InputWrapper = styled.div`
  display: flex;
  align-items: center;

  & > span {
    margin-left: 10px;
  }
`;

const Input = styled.input`
  appearance: none;

  &:checked ~ .radio-checked {
    display: block;
  }
  &:checked ~ .radio-unchecked {
    display: none;
  }
  &:not(:checked) ~ .radio-checked {
    display: none;
  }
  &:not(:checked) ~ .radio-unchecked {
    display: block;
  }
`;
