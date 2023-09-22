import { useState, useRef, useEffect } from "react";
import { basicColors, grayColors } from "@/resources/colors/colors";
import storeContainer from "@/store/storeContainer";
import styled from "styled-components";
import * as THREE from "three";

const SliderContainer = styled.div`
  width: 200px;
  margin: 20px 0;
`;
const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 10px;
`;

const SliderInput = styled.input.attrs({ type: "range" })`
  width: 100%;
  height: 2px;
  appearance: none;
  background: var(--slider-background, ${basicColors.primary});
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
  border-radius: 5px;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 10px;
    height: 10px;
    outline: 1px solid #fff;
    background: #303030;
    border-radius: 50%;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 10px;
    height: 10px;
    background: #e1f853;
    border: none;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const SliderValue = styled.span`
  font-size: 10px;
`;

interface SliderProps {
  title: string;
  min: number;
  max: number;
  step: number;
  initValue: number;
}
const titleToMaterialProperty: Record<
  string,
  { property: string; materialType: any }
> = {
  금속성: { property: "metalness", materialType: THREE.MeshStandardMaterial },
  거칠기: { property: "roughness", materialType: THREE.MeshStandardMaterial },
};
const Slider = ({
  title = "",
  min = 0,
  max = 100,
  step = 1,
  initValue = 0,
}: SliderProps) => {
  const [value, setValue] = useState(initValue);
  const sliderInputRef = useRef<HTMLInputElement | null>(null);
  const [mesh, setMesh] = useState(new THREE.Mesh());
  const { primitiveStore } = storeContainer;
  const keys = Object.keys(primitiveStore.selectedPrimitives);

  useEffect(() => {
    if (primitiveStore.selectedPrimitives[keys[0]]) {
      setMesh(primitiveStore.selectedPrimitives[keys[0]]);
    }
  }, [primitiveStore.selectedPrimitives]);

  const handleChange = () => {
    if (sliderInputRef.current) {
      const newValue = Number(sliderInputRef.current.value);
      setValue(newValue);
      const thumbPosition = ((newValue - min) / (max - min)) * 100;
      const sliderBackground = `linear-gradient(to right, ${basicColors.primary} ${thumbPosition}%, ${grayColors.lightGray} ${thumbPosition}%)`;
      sliderInputRef.current.style.setProperty(
        "--slider-background",
        sliderBackground
      );
      const materialProperty = titleToMaterialProperty[title];
      if (
        materialProperty &&
        mesh.material instanceof materialProperty.materialType
      ) {
        (mesh.material as any)[materialProperty.property] = newValue;
      }
    }
  };

  useEffect(() => {
    handleChange();
  }, [value]);

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  return (
    <SliderContainer>
      <TitleWrapper>
        <span>{title}</span>
        <SliderValue>{value}</SliderValue>
      </TitleWrapper>
      <SliderInput
        ref={sliderInputRef}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
      />
    </SliderContainer>
  );
};

export default Slider;
