import { Light } from 'three';
import {
  HsvaColor,
  RgbaColor,
  hsvaToRgbString,
  hsvaToRgba,
  rgbaToHsva
} from '@uiw/color-convert';
import styled from 'styled-components';
import CustomMenu, { useCustomMenu } from '@/components/layout/Menu';
import Slider from '@components/common/Slider.tsx';
import ColorContent from './ColorContent';

interface Props {
  light: Light;
}

const LightProperty = ({ light }: Props) => {
  const { r, g, b } = light.color;
  const hsvaColor = rgbaToHsva({ r: r * 255, g: g * 255, b: b * 255, a: 1 });
  const lightMenu = useCustomMenu();
  const colorButton = (
    <ColorButton
      $rgbColor={hsvaToRgba(hsvaColor)}
      onClick={(event) => lightMenu.handleToggle(event)}
    />
  );
  return (
    <div>
      <ColorWrapper>
        <span>컬러</span>
        {colorButton}
        <CustomMenu
          title={'컬러'}
          anchorButton={colorButton}
          anchorElement={lightMenu.anchorEl}
          MenuItem={
            <ColorContent
              color={hsvaColor}
              onChangeHsvaProp={(hsva: HsvaColor) => {
                light.color.set(hsvaToRgbString(hsva));
              }}
            />
          }
          handleClose={lightMenu.handleClose}
        />
      </ColorWrapper>
      <Slider
        min={0}
        max={50}
        step={0.01}
        initValue={light.intensity}
        onMaterialChange={(value) => (light.intensity = value)}
        title="강도"
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
const ColorButton = styled.button<{
  $rgbColor: RgbaColor;
}>`
  width: 24px;
  min-width: 0;
  min-height: 0;
  height: 24px;
  background-color: ${(props) =>
    `rgba(${props.$rgbColor.r},${props.$rgbColor.g},${props.$rgbColor.b},${props.$rgbColor.a})`};
`;
