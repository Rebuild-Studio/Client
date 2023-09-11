import React, { useState } from "react";
import styled from "styled-components";

const SliderContainer = styled.div`
  width: 200px;
  margin: 20px 0;
`;

const SliderInput = styled.input.attrs({ type: "range" })`
  width: 100%;
  height: 2px;
  appearance: none;
  background: var(--slider-background, #e1f853);
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

const Slider = () => {
  const [value, setValue] = useState(50);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);

    const thumbPosition = ((newValue - 0) / (100 - 0)) * 100;
    const sliderBackground = `linear-gradient(to right, #e1f853 ${thumbPosition}%, #d3d3d3 ${thumbPosition}%)`;

    document.documentElement.style.setProperty(
      "--slider-background",
      sliderBackground
    );
  };

  return (
    <SliderContainer>
      <SliderInput min={0} max={100} value={value} onChange={handleChange} />
      <SliderValue>{value}</SliderValue>
    </SliderContainer>
  );
};

export default Slider;
