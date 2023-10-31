import { Light } from 'three';
import styled from 'styled-components';
import Slider from '@components/common/Slider.tsx';

interface Props {
  light: Light;
}

const LightProperty = ({ light }: Props) => {
  return (
    <Wrapper>
      <Slider
        min={0}
        max={50}
        step={0.01}
        initValue={light.intensity}
        onMaterialChange={(value) => (light.intensity = value)}
        title="Intensity"
      />
    </Wrapper>
  );
};

export default LightProperty;

const Wrapper = styled.div``;
