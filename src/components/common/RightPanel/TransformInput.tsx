import { useState, useEffect } from 'react';
import storeContainer from '@/store/storeContainer';
import InputField from '../InputField';
import { observer } from 'mobx-react';
import { roundToNDecimalPlaces } from '@utils/number/roundToDecimalPlaces';
import * as THREE from 'three';

interface Props {
  type: 'position' | 'rotation' | 'scale';
  axis: 'x' | 'y' | 'z';
  initValue: string;
}
const TransformInput = (props: Props) => {
  const [value, setValue] = useState(Number(props.initValue));
  const [position, setPosition] = useState(new THREE.Vector3());
  const [rotation, setRotation] = useState(new THREE.Euler());
  const [scale, setScale] = useState(new THREE.Vector3());
  const { primitiveStore } = storeContainer;

  const selectedPrimitive = Object.values(primitiveStore.selectedPrimitives)[0];
  const selectedMeshTransform = selectedPrimitive?.[props.type];
  useEffect(() => {
    if (selectedPrimitive) {
      setValue(selectedMeshTransform[props.axis]);
      setPosition(selectedPrimitive.position);
      setRotation(selectedPrimitive.rotation);
      setScale(selectedPrimitive.scale);
    }
  }, [primitiveStore.selectedPrimitives]);

  const handleKeyChange = (input: string) => {
    setValue(Number(input));

    const prop = props.type;
    const axis: 'x' | 'y' | 'z' = props.axis;

    const currentValue = {
      position: new THREE.Vector3().copy(position),
      rotation: new THREE.Euler().copy(rotation),
      scale: new THREE.Vector3().copy(scale)
    }[prop];

    const inputValue = Number(input);
    const newValue = initializeNewValue({
      prop,
      axis,
      currentValue,
      inputValue
    });

    updateTransform(prop, newValue, selectedPrimitive);
  };

  return (
    <InputField
      type={'number'}
      title={props.type}
      label={props.axis}
      value={roundToNDecimalPlaces(Number(value), 2)}
      onClickChange={handleKeyChange}
      onChange={handleKeyChange}
    />
  );
};

const Observer = observer(TransformInput);
export default Observer;

interface initNewValueProps {
  prop: string;
  axis: 'x' | 'y' | 'z';
  currentValue: THREE.Vector3 | THREE.Euler;
  inputValue: number;
}
function initializeNewValue({
  prop,
  axis,
  currentValue,
  inputValue
}: initNewValueProps) {
  switch (prop) {
    case 'position': {
      if (currentValue instanceof THREE.Vector3) {
        const newValue = new THREE.Vector3().copy(currentValue);
        newValue[axis] = inputValue;
        return newValue;
      }
      break;
    }
    case 'rotation':
      {
        if (currentValue instanceof THREE.Euler) {
          const newValue = new THREE.Euler().copy(currentValue);
          newValue[axis] = inputValue;
          return newValue;
        }
      }
      break;
    case 'scale':
      {
        if (currentValue instanceof THREE.Vector3) {
          const newValue = { ...currentValue };
          newValue[axis] = inputValue;
          return newValue;
        }
      }
      break;
    default:
      return currentValue;
  }
  return currentValue;
}

const updateTransform = (prop: string, newValue: any, newMesh: THREE.Mesh) => {
  switch (prop) {
    case 'position':
      newMesh.position.set(newValue.x, newValue.y, newValue.z);
      break;
    case 'rotation':
      newMesh.rotation.set(newValue.x, newValue.y, newValue.z);
      break;
    case 'scale':
      newMesh.scale.set(newValue.x, newValue.y, newValue.z);
      break;
    default:
      break;
  }
};
