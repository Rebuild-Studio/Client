import React, { useState, useEffect } from "react";
import storeContainer from "@/store/storeContainer";
import InputField from "../InputField";
import { observer } from "mobx-react";
import * as THREE from "three";

interface initNewValueProps {
  prop: string;
  axis: "x" | "y" | "z";
  currentValue: any;
  inputValue: number;
}
interface Props {
  type: "position" | "rotation" | "scale";
  axis: "x" | "y" | "z";
  initValue: string;
}
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

const TransformInput = observer((props: Props) => {
  const [value, setValue] = useState(Number(props.initValue));
  const [position, setPosition] = useState(new THREE.Vector3());
  const [rotation, setRotation] = useState(new THREE.Euler());
  const [scale, setScale] = useState(new THREE.Vector3());
  const [newMesh, setNewMesh] = useState(new THREE.Mesh());
  const { primitiveStore } = storeContainer;

  const keys = Object.keys(primitiveStore.selectedPrimitives);
  const selectedMeshTransform =
    primitiveStore.selectedPrimitives[keys[0]]?.[props.type];
  useEffect(() => {
    if (primitiveStore.selectedPrimitives[keys[0]]) {
      setValue(selectedMeshTransform[props.axis]);
      setNewMesh(primitiveStore.selectedPrimitives[keys[0]]);
      setPosition(newMesh.position);
      setRotation(newMesh.rotation);
      setScale(newMesh.scale);
    }
  }, [primitiveStore.selectedPrimitives]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));

    const prop = props.type;
    const axis: "x" | "y" | "z" = props.axis;

    const currentValue = {
      position: { ...position },
      rotation: new THREE.Euler().copy(rotation),
      scale: { ...scale },
    }[prop];

    const inputValue = Number(e.target.value);
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
    <InputField
      type={"number"}
      title={props.type}
      label={props.axis}
      value={Number(value)}
      onChange={handleChange}
    />
  );
});

export default TransformInput;
