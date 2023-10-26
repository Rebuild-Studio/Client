import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { basicColors, grayColors } from '@/resources/colors/colors';
import { InputType } from '@/types/style/inputField';

interface Props {
  type: InputType;
  title?: string;
  label?: string;
  value: number | string;
  onClickChange?: (e: string) => void;
  onChange?: (e: string) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({
  label = '',
  value,
  type = 'number',
  onChange = () => {},
  onClickChange = () => {}
}: Props) => {
  const [input, setInput] = useState(value);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      const newValue = String(input).slice(0, -1);
      setInput(newValue);
    } else {
      const isNumberKey = /^[0-9]+$/.test(e.key);
      if (!isNumberKey) {
        e.preventDefault();
      } else {
        const newValue = input + e.key;
        setInput(newValue);
        handleOnChange(newValue);
      }
    }
  };

  const handleOnChange = (newInput: string) => {
    const koreanRegex = /[ㄱ-ㅎㅏ-ㅣ가-힣]/;
    const valueWithoutKorean = newInput.replace(koreanRegex, '');
    newInput = valueWithoutKorean;
    const SingleRegex = /^[0-9]+$/;
    const isNumericValue = SingleRegex.test(newInput);

    if (isNumericValue) {
      const NumInput = Math.round(Number(newInput));
      setInput(String(NumInput));
      onChange(String(NumInput));
    }
  };
  useEffect(() => {
    setInput(value);
  }, [value]);

  return (
    <Wrapper>
      <Label>{label}</Label>
      <Container>
        <Input
          type={type}
          onKeyDown={(e) => handleKeyPress(e)}
          value={input}
          onChange={(e) => {
            onClickChange(e.target.value);
          }}
        />
      </Container>
    </Wrapper>
  );
};

export default InputField;

const Wrapper = styled.div`
  width: 78px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Container = styled.div`
  width: 60px;
  height: 24px;
  margin-left: 3px;
  border-radius: 3px;
  background-color: ${grayColors.buttonColor};
  display: flex;
  position: relative;
`;
const Label = styled.div`
  font-family: Inter;
  font-size: 12px;
  text-align: left;
  color: ${grayColors.lightGray};
`;
const Input = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 3px;
  border: none;
  border-radius: 3px;
  outline: none;
  background-color: ${grayColors.buttonColor};
  color: ${basicColors.white};
  &:focus {
    border: solid 1px ${basicColors.primary};
    margin: 0;
  }

  -moz-appearance: textfield;
  appearance: textfield;
`;
