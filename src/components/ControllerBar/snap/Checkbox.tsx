import { styled } from "styled-components";

import CheckboxUncheckedIcon from "../icons/checkbox-unchecked.svg?react";
import CheckboxCheckedIcon from "../icons/checkbox-checked.svg?react";

interface Props {
  value: string;
  name: string;
}

const Checkbox = ({ value, name }: Props) => {
  return (
    <label htmlFor={value} key={value}>
      <InputWrapper>
        <CheckboxInput
          id={value}
          name={value}
          type={"checkbox"}
          value={value}
        />
        <div className={"select-checked"}>
          <CheckboxCheckedIcon />
        </div>
        <div className={"select-unchecked"}>
          <CheckboxUncheckedIcon />
        </div>
        <span>{name}</span>
        {value === "grid" && <Shortcut>G</Shortcut>}
        {value === "rotate" && <Shortcut>A</Shortcut>}
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

  &:checked ~ .select-unchecked {
    display: none;
  }
  &:checked ~ .select-checked {
    display: block;
  }
  &:not(:checked) ~ .select-unchecked {
    display: block;
  }
  &:not(:checked) ~ .select-checked {
    display: none;
  }
`;

const Shortcut = styled.span`
  color: grey;
  position: absolute;
  right: 12px;
`;
