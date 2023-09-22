import React, { ChangeEvent, KeyboardEvent, useState, useEffect } from "react";
import styled from "styled-components";
import { InputType } from "@/types/style/InputField";
import { basicColors, grayColors } from "@/resources/colors/colors";
import storeContainer from "@/store/storeContainer";
import { observer } from "mobx-react";
import * as THREE from "three";

interface Props {
  type: InputType;
  title: string;
  label: "x" | "y" | "z";
  initValue: string;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface initNewValueProps {
  prop: string;
  axis: "x" | "y" | "z";
  currentValue: any;
  inputValue: number;
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

function initializeNewValue({
  prop,
  axis,
  currentValue,
  inputValue,
}: initNewValueProps) {
  switch (prop) {
    case "position": {
      const newValue = new THREE.Vector3().copy(currentValue);
      newValue[axis] = inputValue;
      return newValue;
    }
    case "rotation": {
      const newValue = new THREE.Euler().copy(currentValue);
      newValue[axis] = inputValue;
      return newValue;
    }
    case "scale": {
      const newValue = { ...currentValue };
      newValue[axis] = inputValue;
      return newValue;
    }
    default:
      return currentValue;
  }
}

const updateTransform = (prop: string, newValue: any, newMesh: THREE.Mesh) => {
  switch (prop) {
    case "position":
      newMesh.position.set(newValue.x, newValue.y, newValue.z);
      break;
    case "rotation":
      newMesh.rotation.set(newValue.x, newValue.y, newValue.z);
      break;
    case "scale":
      newMesh.scale.set(newValue.x, newValue.y, newValue.z);
      break;
    default:
      break;
  }
};

const InputField = observer(
  ({ label, initValue, type = "number", title = "" }: Props) => {
    const [value, setValue] = useState(Number(initValue));
    const [position, setPosition] = useState(new THREE.Vector3());
    const [rotation, setRotation] = useState(new THREE.Euler());
    const [scale, setScale] = useState(new THREE.Vector3());
    const [newMesh, setNewMesh] = useState(new THREE.Mesh());
    const { primitiveStore } = storeContainer;

    const keys = Object.keys(primitiveStore.selectedPrimitives);
    useEffect(() => {
      if (primitiveStore.selectedPrimitives[keys[0]]) {
        setNewMesh(primitiveStore.selectedPrimitives[keys[0]]);
        setPosition(newMesh.position);
        setRotation(newMesh.rotation);
        setScale(newMesh.scale);
      }
    }, [primitiveStore.selectedPrimitives]);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.currentTarget.type === "number") {
        const allowedKeys = ["Backspace", "Enter"];
        const isNumberKey = /^[0-9.\-\b]+$/.test(e.key);
        if (!isNumberKey && !allowedKeys.includes(e.key)) {
          e.preventDefault();
        }
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(Number(e.target.value));

      const prop = title;
      const axis: "x" | "y" | "z" = label;

      const currentValue = {
        position: { ...position },
        rotation: new THREE.Euler().copy(rotation),
        scale: { ...scale },
      }[prop];

      let inputValue = Number(e.target.value);
      const newValue = initializeNewValue({
        prop,
        axis,
        currentValue,
        inputValue,
      });

      updateTransform(prop, newValue, newMesh);
      primitiveStore.updateSelectedPrimitives(keys[0], newMesh);
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
  }
);

export default InputField;
