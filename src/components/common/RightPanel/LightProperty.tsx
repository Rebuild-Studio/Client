import { Light } from 'three';
import { hsvaToRgbString, rgbaToHsva } from '@uiw/color-convert';
import styled from 'styled-components';
import ColorPicker from '@components/common/RightPanel/ColorPicker.tsx';
import Slider from '@components/common/Slider.tsx';

interface Props {
  light: Light;
}

const LightProperty = ({ light }: Props) => {
  const { r, g, b } = light.color;
  const hsvaColor = rgbaToHsva({ r: r * 255, g: g * 255, b: b * 255, a: 1 });

  return (
    <div>
      <ColorWrapper>
        <span>Light color</span>
        <ColorPicker
          label="Light color"
          color={hsvaColor}
          onChangeHsvaProp={(hsva) => {
            light.color.set(hsvaToRgbString(hsva));
          }}
        />
      </ColorWrapper>
      <Slider
        min={0}
        max={50}
        step={0.01}
        initValue={light.intensity}
        onMaterialChange={(value) => (light.intensity = value)}
        title="Intensity"
      />
    </div>
  );
};

export default LightProperty;

const ColorWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 10px;
`;
