import React, { useState, useRef, useEffect } from "react";
import { basicColors, grayColors } from "@/resources/colors/colors";
import styled from "styled-components";

const SliderContainer = styled.div`
  width: 200px;
  margin: 20px 0;
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
  font-size: 18px;
  margin-top: 10px;
`;

interface SliderProps {
  min: number;
  max: number;
}

const Slider = ({ min = 0, max = 100 }: SliderProps) => {
  const [value, setValue] = useState(50);
  const sliderInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = () => {
    if (sliderInputRef.current) {
      console.log(sliderInputRef.current.value);
      const newValue = Number(sliderInputRef.current.value);
      setValue(newValue);

      const thumbPosition = ((newValue - min) / (max - min)) * 100;
      const sliderBackground = `linear-gradient(to right, ${basicColors.primary} ${thumbPosition}%, ${grayColors.lightGray} ${thumbPosition}%)`;

      sliderInputRef.current.style.setProperty(
        "--slider-background",
        sliderBackground
      );
    }
  };

  useEffect(() => {
    handleChange();
  }, []);

  return (
    <SliderContainer>
      <SliderInput
        ref={sliderInputRef}
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
      />
      <SliderValue>{value}</SliderValue>
    </SliderContainer>
  );
};

export default Slider;
