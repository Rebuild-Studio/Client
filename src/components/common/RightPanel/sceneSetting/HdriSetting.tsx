import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { HsvaColor, RgbaColor, hsvaToRgba } from '@uiw/color-convert';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Switch from '@/components/buttons/SwitchButton';
import ColorHandler from '@/components/common/RightPanel/ColorHandler';
import Slider from '@/components/common/Slider';
import Accordion from '@/components/layout/Accordion';
import CustomMenu, { useCustomMenu } from '@/components/layout/Menu';
import storeContainer from '@/store/storeContainer';
import BackgroundImageTemplate from './BackgroundImageTemplate';
import ColorContent from '../ColorContent';

const HdriSetting = () => {
  const { sceneSettingStore } = storeContainer;
  const {
    updateAmbientLightColor,
    updateAmbientLightAlpha,
    updateDirectionalLightColor,
    updateDirectionalLightAlpha
  } = ColorHandler;
  const [ambientLightColor, setAmbientLightColor] = useState<HsvaColor>({
    h: 0,
    s: 0,
    v: 0,
    a: 0
  });
  const [directionalLightColor, setDirectionalLightColor] = useState<HsvaColor>(
    { h: 0, s: 0, v: 0, a: 0 }
  );
  const hdriMenu = useCustomMenu();
  const ambientLightMenu = useCustomMenu();
  const directionalLightMenu = useCustomMenu();

  useEffect(() => {
    setAmbientLightColor(sceneSettingStore.ambientLightColor);
  }, [sceneSettingStore.ambientLightColor]);

  useEffect(() => {
    setDirectionalLightColor(sceneSettingStore.directionalLightColor);
  }, [sceneSettingStore.directionalLightColor]);

  const ambientLightColorAnchorButton = (
    <ColorButton
      $color={ambientLightColor}
      $rgbColor={hsvaToRgba(ambientLightColor)}
      onClick={(event) => ambientLightMenu.handleToggle(event)}
    />
  );
  const directionalLightAnchorButton = (
    <ColorButton
      $color={directionalLightColor}
      $rgbColor={hsvaToRgba(directionalLightColor)}
      onClick={(event) => directionalLightMenu.handleToggle(event)}
    />
  );
  const hdriBackgroundAnchorButton = (
    <img
      src={
        sceneSettingStore.hdriBackgroundVisibleToggle
          ? '/icons/studio/icon_보이기.svg'
          : '/icons/studio/icon_가리기.svg'
      }
      onClick={(event) => {
        sceneSettingStore.setHdriBackgroundVisibleToggle(
          !sceneSettingStore.hdriBackgroundVisibleToggle
        );
        hdriMenu.handleToggle(event);
      }}
      alt="visible"
    />
  );

  return (
    <>
      <Accordion title={'환경이미지'}>
        <SwitchWrapper>
          <Switch
            checked={sceneSettingStore.hdriToggle}
            onChange={sceneSettingStore.setHdriToggle}
          />
        </SwitchWrapper>

        <TitleWrapper>
          <span>{'환경이미지'}</span>
          {hdriBackgroundAnchorButton}
          {sceneSettingStore.hdriBackgroundVisibleToggle && (
            <CustomMenu
              title={'환경이미지 템플릿'}
              anchorButton={hdriBackgroundAnchorButton}
              anchorElement={hdriMenu.anchorEl}
              MenuItem={<BackgroundImageTemplate />}
              handleClose={hdriMenu.handleClose}
            />
          )}
        </TitleWrapper>
        <Slider
          initValue={sceneSettingStore.hdriIntensity}
          onChange={sceneSettingStore.setHdriIntensity}
          min={0}
          max={5}
          title={'환경강도'}
          step={0.1}
          disabled={!sceneSettingStore.hdriToggle}
        />
        <Slider
          initValue={sceneSettingStore.hdriYRotation}
          onChange={sceneSettingStore.setHdriYRotation}
          title={'회전'}
          min={0}
          max={360}
          step={0.1}
          disabled={!sceneSettingStore.hdriToggle}
        />
      </Accordion>
      <Accordion title={'주변광'}>
        <Slider
          initValue={sceneSettingStore.ambientLightIntensity}
          onChange={sceneSettingStore.setAmbientLightIntensity}
          min={0}
          max={2}
          title={'강도'}
          step={0.1}
        />
        <TitleWrapper>
          <span>{'컬러'}</span>
          {ambientLightColorAnchorButton}
          <CustomMenu
            title={'주변광'}
            anchorButton={ambientLightColorAnchorButton}
            anchorElement={ambientLightMenu.anchorEl}
            MenuItem={
              <ColorContent
                color={ambientLightColor}
                onChangeHsvaProp={updateAmbientLightColor}
                onChangeAlphaProp={updateAmbientLightAlpha}
              />
            }
            handleClose={ambientLightMenu.handleClose}
          />
        </TitleWrapper>
      </Accordion>
      <Accordion title={'직사광'}>
        <Slider
          initValue={sceneSettingStore.directionalLightIntensity}
          onChange={sceneSettingStore.setDirectionalLightIntensity}
          min={0}
          max={5}
          title={'강도'}
          step={0.1}
        />
        <TitleWrapper>
          <span>{'컬러'}</span>
          {directionalLightAnchorButton}
          <CustomMenu
            title={'직사광'}
            anchorButton={directionalLightAnchorButton}
            anchorElement={directionalLightMenu.anchorEl}
            MenuItem={
              <ColorContent
                color={directionalLightColor}
                onChangeHsvaProp={updateDirectionalLightColor}
                onChangeAlphaProp={updateDirectionalLightAlpha}
              />
            }
            handleClose={directionalLightMenu.handleClose}
          />
        </TitleWrapper>
      </Accordion>
    </>
  );
};

const Observer = observer(HdriSetting);
export default Observer;

const TitleWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  font-size: 10px;
`;

const SwitchWrapper = styled.div`
  position: absolute;
  top: 5px;
  right: 0;
`;

const ColorButton = styled.button<{
  $color: HsvaColor;
  $rgbColor: RgbaColor;
}>`
  width: 24px;
  min-width: 0;
  min-height: 0;
  height: 24px;
  background-color: ${(props) =>
    typeof props.$color !== 'undefined' &&
    `rgba(${props.$rgbColor.r},${props.$rgbColor.g},${props.$rgbColor.b},${props.$rgbColor.a})`};
`;
