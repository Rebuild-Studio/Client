import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import styled from "styled-components";
import { InputType } from "@/types/style/InputField";
import { basicColors, grayColors } from "@/resources/colors/colors";

interface Props {
  type: InputType;
  label: string;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
}
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
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: inner-spin-button;
    appearance: inner-spin-button;
    margin: 0;
  }
`;

const InputField = ({ label, type = "number", ...otherProps }: Props) => {
  const [value, setValue] = useState("");

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.currentTarget.type === "number") {
      const allowedKeys = [8, 13];
      const isNumberKey = /^[0-9\b]+$/.test(e.key);
      if (!isNumberKey && !allowedKeys.includes(e.keyCode)) {
        e.preventDefault();
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <Wrapper>
      <Label>{label}</Label>
      <Container>
        <Input
          type={type}
          onKeyDownCapture={handleKeyPress}
          value={value}
          onChange={handleChange}
        />
      </Container>
    </Wrapper>
  );
};

export default InputField;
