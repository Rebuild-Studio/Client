import { styled } from "styled-components";
import RadioIcon from "@/features/controllerBar/components/icons/RadioIcon";

interface Props {
  value: string;
  name: string;
  radioGroup: string;
  selected: boolean;
}

const RadioInput = ({ value, name, radioGroup, selected }: Props) => {
  return (
    <label htmlFor={value} key={value}>
      <InputWrapper>
        <Input id={value} type="radio" name={radioGroup} value={value} />
        <RadioIcon checked={selected} />
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
`;
