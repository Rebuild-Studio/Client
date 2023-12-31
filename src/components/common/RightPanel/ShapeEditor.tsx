import { useState, useEffect } from 'react';
import * as THREE from 'three';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import Switch from '@/components/buttons/SwitchButton';
import Accordion from '@/components/layout/Accordion';
import storeContainer from '@/store/storeContainer';
import { useToast } from '@hooks/useToast';
import dataStore from './MaterialGeometryData';
import Slider from '../Slider';

interface geometryParameter {
  [key: string]: string | number | boolean;
}

const getGeometryParameters = (
  geometryType: string,
  selectedPrimitive: THREE.Mesh
) => {
  switch (geometryType) {
    case 'BoxGeometry':
      return (selectedPrimitive.geometry as THREE.BoxGeometry).parameters;
    case 'ConeGeometry':
      return (selectedPrimitive.geometry as THREE.ConeGeometry).parameters;
    case 'SphereGeometry':
      return (selectedPrimitive.geometry as THREE.SphereGeometry).parameters;
    case 'CapsuleGeometry':
      return (selectedPrimitive.geometry as THREE.CapsuleGeometry).parameters;
    case 'CylinderGeometry':
      return (selectedPrimitive.geometry as THREE.CylinderGeometry).parameters;
    case 'TorusGeometry':
      return (selectedPrimitive.geometry as THREE.TorusGeometry).parameters;
    default:
      return {};
  }
};

const createGeometry = (geometryType: string, parameter: number[]) => {
  switch (geometryType) {
    case 'BoxGeometry':
      return new THREE.BoxGeometry(...parameter);

    case 'SphereGeometry':
      return new THREE.SphereGeometry(...parameter);

    case 'CylinderGeometry':
      return new THREE.CylinderGeometry(...parameter);

    case 'ConeGeometry':
      return new THREE.ConeGeometry(...parameter);

    case 'TorusGeometry':
      return new THREE.TorusGeometry(...parameter);

    case 'PlaneGeometry':
      return new THREE.PlaneGeometry(...parameter);

    case 'CapsuleGeometry':
      return new THREE.CapsuleGeometry(...parameter);

    default:
      throw new Error(`Unsupported geometry type: ${geometryType}`);
  }
};

const ShapeEditor = () => {
  const { primitiveStore } = storeContainer;
  const selectedPrimitive = Object.values(primitiveStore.selectedPrimitives)[0];
  const [shapeName, setShapeName] = useState(
    selectedPrimitive.name as keyof typeof dataStore
  );
  const [geometryType, setGeometryType] = useState(
    selectedPrimitive.geometry.type
  );
  const [parameter, setParameter] = useState<geometryParameter>(
    getGeometryParameters(geometryType, selectedPrimitive) as geometryParameter
  );
  const { addToast } = useToast();

  useEffect(() => {
    setShapeName(
      selectedPrimitive.name as keyof typeof dataStore
    );
    setGeometryType(selectedPrimitive.geometry.type);
    setParameter(
      getGeometryParameters(
        geometryType,
        selectedPrimitive
      ) as geometryParameter
    );
  }, [selectedPrimitive]);

  const handleShapeChange = (prop: string, value: number | boolean) => {
    const updatedParameter = { ...parameter };
    updatedParameter[prop] = value;

    setParameter(updatedParameter);

    const paramDatas = [] as number[];
    for (const pr in parameter) {
      paramDatas.push(parameter[pr] as number);
    }

    try {
      const newGeometry = createGeometry(geometryType, paramDatas);
      selectedPrimitive.geometry as
        | THREE.BoxGeometry
        | THREE.CylinderGeometry
        | THREE.SphereGeometry
        | THREE.TorusGeometry
        | THREE.PlaneGeometry
        | THREE.CapsuleGeometry;

      selectedPrimitive.geometry = newGeometry;
    } catch {
      console.error();
      addToast(`Error in handleShapeChange`);
    }
  };

  return (
    <>
      <Accordion title={'쉐이프'}>
        {dataStore[shapeName]?.map((el) => {
          return (
            <Wrapper key={String(el[0])}>
              <InputWrapper>
                {el[2] === 'slider' && (
                  <Slider
                    min={Number(el[4])}
                    step={Number(el[6])}
                    max={Number(el[5])}
                    title={String(el[1])}
                    initValue={
                      Math.round(Number(parameter[el[0] as string]) * 100) / 100
                    }
                    onChange={(e) => {
                      handleShapeChange(el[0] as string, e);
                    }}
                  />
                )}
                {el[2] === 'toggle' && (
                  <Switch
                    label={String(el[1])}
                    checked={Boolean(parameter[el[0] as string])}
                    onChange={(e) => {
                      handleShapeChange(el[0] as string, e);
                    }}
                  />
                )}
              </InputWrapper>
            </Wrapper>
          );
        })}
      </Accordion>
    </>
  );
};

const Observer = observer(ShapeEditor);
export default Observer;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;
const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
