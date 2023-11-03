import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { HsvaColor, RgbaColor, hsvaToRgba } from '@uiw/color-convert';
import styled from 'styled-components';
import Switch from '@/components/buttons/SwitchButton';
import ColorHandler from '@/components/common/RightPanel/ColorHandler';
import Accordion from '@/components/layout/Accordion';
import CustomMenu, { useCustomMenu } from '@/components/layout/Menu';
import storeContainer from '@/store/storeContainer';
import ColorContent from '../ColorContent';

const DisplaySetting = () => {
  const { updateCanvasBackgroundColor, updateCanvasBackgroundAlpha } =
    ColorHandler;
  const { sceneSettingStore } = storeContainer;
  const [color, setColor] = useState<HsvaColor>(
    sceneSettingStore.canvasBackgroundColor
  );
  const canvasBackgroundMenu = useCustomMenu();
  useEffect(() => {
    setColor(sceneSettingStore.canvasBackgroundColor);
  }, [sceneSettingStore.canvasBackgroundColor]);

  const canvasBackgroundButton = (
    <ColorButton
      $rgbColor={hsvaToRgba(color)}
      onClick={(event) => canvasBackgroundMenu.handleToggle(event)}
    />
  );
  return (
    <>
      <Accordion title={'배경 컬러'}>
        <Switch
          label={''}
          checked={sceneSettingStore.canvasBackgroundColorToggle}
          onChange={sceneSettingStore.setCanvasBackgroundColorToggle}
        />
        <TitleWrapper>
          <span>{'배경 컬러'}</span>
          {canvasBackgroundButton}
          <CustomMenu
            title="배경컬러"
            anchorButton={canvasBackgroundButton}
            anchorElement={canvasBackgroundMenu.anchorEl}
            handleClose={canvasBackgroundMenu.handleClose}
            MenuItem={
              <ColorContent
                color={color}
                onChangeHsvaProp={updateCanvasBackgroundColor}
                onChangeAlphaProp={updateCanvasBackgroundAlpha}
              />
            }
          />
        </TitleWrapper>
      </Accordion>

      <Accordion title={'그리드'}>
        <GridSwitchWrapper>
          <Switch
            label={'사각형 그리드'}
            checked={sceneSettingStore.isGridVisible}
            onChange={sceneSettingStore.setIsGridVisible}
          />
          <Switch
            label={'중심선 그리드'}
            checked={sceneSettingStore.isAxisVisible}
            onChange={sceneSettingStore.setIsAxisVisible}
          />
        </GridSwitchWrapper>
      </Accordion>
    </>
  );
};

const Observer = observer(DisplaySetting);
export default Observer;

const TitleWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  font-size: 10px;
`;

const GridSwitchWrapper = styled.div`
  & > *:not(:last-child) {
    margin-bottom: 10px;
  }
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
