import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { basicColors, grayColors } from '@/resources/colors/colors';

interface SliderProps {
  title: string;
  min: number;
  max: number;
  step: number;
  initValue: number;
  onMouseDown?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onMouseUp?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onMaterialChange?: (newValue: number) => void;
  onChange?: (e: number) => void;
  disabled?: boolean;
}

const Slider = ({
  title = '',
  min = 0,
  max = 100,
  step = 1,
  initValue = 0,
  onMaterialChange = () => {},
  onChange = () => {},
  disabled
}: SliderProps) => {
  const [value, setValue] = useState(initValue);
  const sliderInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = () => {
    if (sliderInputRef.current) {
      const newValue = Number(sliderInputRef.current.value);
      setValue(newValue);
      const thumbPosition = ((newValue - min) / (max - min)) * 100;
      const sliderBackground = `linear-gradient(to right, ${basicColors.primary} ${thumbPosition}%, ${grayColors.lightGray} ${thumbPosition}%)`;
      sliderInputRef.current.style.setProperty(
        '--slider-background',
        sliderBackground
      );
      onMaterialChange(newValue);
      onChange(newValue);
    }
  };

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  useEffect(() => {
    handleChange();
  }, [value]);

  return (
    <SliderContainer $disabled={!!disabled}>
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

const SliderContainer = styled.div<{ $disabled: boolean }>`
  margin: 20px 0;
  ${({ $disabled }) =>
    $disabled &&
    css`
      pointer-events: none;
      filter: brightness(30%);
    `}
`;
const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 10px;
`;

const SliderInput = styled.input.attrs({ type: 'range' })`
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
