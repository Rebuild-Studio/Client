import { observer } from 'mobx-react';
import { Canvas } from '@react-three/fiber';
import { hsvaToHex } from '@uiw/color-convert';
import styled from 'styled-components';
import { bgColors } from '@/resources/colors/colors';
import storeContainer from '@/store/storeContainer';
import { CanvasHelper } from './CanvasHelper';
import Grid from './Grid';
import SceneEnvironment from './SceneEnvironment';
import RenderScene from '../scene/RenderScene';

const Scene = () => {
  const { mouseEventStore, sceneSettingStore } = storeContainer;

  return (
    <Wrapper>
      <CustomCanvas
        id="canvas"
        camera={{ fov: 50, position: [0, 2, 3.0] }}
        $backgroundColor={
          sceneSettingStore.canvasBackgroundColorToggle
            ? hsvaToHex(sceneSettingStore.canvasBackgroundColor)
            : bgColors.sceneBackground
        }
        onMouseDown={(e) => {
          mouseEventStore.updateMouseEvent('onMouseDown', e);
        }}
        onMouseUp={(e) => {
          mouseEventStore.updateMouseEvent('onMouseUp', e);
        }}
        onClick={(e) => {
          mouseEventStore.updateMouseEvent('onClick', e);
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          mouseEventStore.updateMouseEvent('onContextMenu', e);
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
          mouseEventStore.updateMouseEvent('onDrop', e);
        }}
      >
        <SceneEnvironment />
        <Grid />
        <CanvasHelper />
        <RenderScene />
      </CustomCanvas>
    </Wrapper>
  );
};

const Observer = observer(Scene);
export default Observer;

const Wrapper = styled.div`
  height: 100%;
`;

const CustomCanvas = styled(Canvas)<{ $backgroundColor: string }>`
  background: ${({ $backgroundColor }) => $backgroundColor};
`;
