import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { HsvaColor } from '@uiw/color-convert';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Switch from '@/components/buttons/SwitchButton';
import ColorHandler from '@/components/common/RightPanel/ColorHandler';
import Slider from '@/components/common/Slider';
import Accordion from '@/components/layout/Accordion';
import CustomMenu from '@/components/layout/Menu';
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
  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setAmbientLightColor(sceneSettingStore.ambientLightColor);
  }, [sceneSettingStore.ambientLightColor]);

  useEffect(() => {
    setDirectionalLightColor(sceneSettingStore.directionalLightColor);
  }, [sceneSettingStore.directionalLightColor]);

  const handleToggle = (event: React.MouseEvent<HTMLImageElement>) => {
    if (!openMenu) {
      setAnchorEl(event.currentTarget);
      setOpenMenu(true);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const anchorButton = (
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
        handleToggle(event);
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
          {anchorButton}
          {sceneSettingStore.hdriBackgroundVisibleToggle &&
            ReactDOM.createPortal(
              <CustomMenu
                title={'환경이미지 템플릿'}
                anchorButton={anchorButton}
                anchorElement={anchorEl}
                MenuItem={<BackgroundImageTemplate />}
                handleClose={handleClose}
              />,
              document.getElementById('menu-root')!
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
          <ColorContent
            color={ambientLightColor}
            onChangeHsvaProp={updateAmbientLightColor}
            onChangeAlphaProp={updateAmbientLightAlpha}
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
          <ColorContent
            color={directionalLightColor}
            onChangeHsvaProp={updateDirectionalLightColor}
            onChangeAlphaProp={updateDirectionalLightAlpha}
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
