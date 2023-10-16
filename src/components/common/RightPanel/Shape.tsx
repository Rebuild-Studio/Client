import Slider from "../Slider";
import Switch from "@/components/buttons/SwitchButton";
import styled from "styled-components";
import dataStore from "./MaterialGeometryData";
import storeContainer from "@/store/storeContainer";
import Accordion from "@/components/layout/Accordion";
import * as THREE from "three";
import { observer } from "mobx-react";
import { useState } from "react";

interface geometryParameter {
  [key: string]: string | number | boolean;
}

const getGeometryParameters = (
  geometryType: string,
  selectedPrimitive: THREE.Mesh
) => {
  switch (geometryType) {
    case "BoxGeometry":
      return (selectedPrimitive.geometry as THREE.BoxGeometry).parameters;
    case "ConeGeometry":
      return (selectedPrimitive.geometry as THREE.ConeGeometry).parameters;
    case "SphereGeometry":
      return (selectedPrimitive.geometry as THREE.SphereGeometry).parameters;
    case "CapsuleGeometry":
      return (selectedPrimitive.geometry as THREE.CapsuleGeometry).parameters;
    case "CylinderGeometry":
      return (selectedPrimitive.geometry as THREE.CylinderGeometry).parameters;
    case "TorusGeometry":
      return (selectedPrimitive.geometry as THREE.TorusGeometry).parameters;
    default:
      return {};
  }
};

const createGeometry = (geometryType: string, parameter: number[]) => {
  try {
    switch (geometryType) {
      case "BoxGeometry":
        return new THREE.BoxGeometry(...parameter);

      case "SphereGeometry":
        return new THREE.SphereGeometry(...parameter);

      case "CylinderGeometry":
        return new THREE.CylinderGeometry(...parameter);

      case "ConeGeometry":
        return new THREE.ConeGeometry(...parameter);

      case "TorusGeometry":
        return new THREE.TorusGeometry(...parameter);

      case "PlaneGeometry":
        return new THREE.PlaneGeometry(...parameter);

      case "CapsuleGeometry":
        return new THREE.CapsuleGeometry(...parameter);

      default:
        throw new Error(`Unsupported geometry type: ${geometryType}`);
    }
  } catch {
    console.error("Error in createGeometry:");
    return new THREE.BoxGeometry(...parameter);
  }
};

const Shape = observer(() => {
  const { primitiveStore } = storeContainer;
  const selectedPrimitive = Object.values(primitiveStore.selectedPrimitives)[0];
  const shapeName =
    selectedPrimitive.name.toLowerCase() as keyof typeof dataStore;
  const geometryType = selectedPrimitive.geometry.type;
  const [parameter, setParameter] = useState<geometryParameter>(
    getGeometryParameters(geometryType, selectedPrimitive) as geometryParameter
  );

  const handleShapeChange = (prop: string, value: number | boolean) => {
    const updatedParameter = { ...parameter };
    updatedParameter[prop] = value;

    setParameter(updatedParameter);

    const paramDatas = [] as number[];
    for (const pr in parameter) {
      paramDatas.push(parameter[pr] as number);
    }
    const newGeometry = createGeometry(geometryType, paramDatas);
    selectedPrimitive.geometry as
      | THREE.BoxGeometry
      | THREE.CylinderGeometry
      | THREE.SphereGeometry
      | THREE.TorusGeometry
      | THREE.PlaneGeometry
      | THREE.CapsuleGeometry;
    selectedPrimitive.geometry = newGeometry;
  };

  return (
    <>
      <Accordion title={"쉐이프"}>
        {dataStore[shapeName]?.map((el, index) => {
          return (
            <Wrapper>
              <InputWrapper>
                {el[2] === "slider" && (
                  <div key={index}>
                    <Slider
                      min={Number(el[4])}
                      step={Number(el[6])}
                      max={Number(el[5])}
                      title={String(el[1])}
                      initValue={
                        Math.round(Number(parameter[el[0] as string]) * 100) /
                        100
                      }
                      onChange={(e) => {
                        handleShapeChange(el[0] as string, e);
                      }}
                    />
                  </div>
                )}
                {el[2] === "toggle" && (
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
});
export default Shape;

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
