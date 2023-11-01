import { observer } from 'mobx-react';
import { nanoid } from 'nanoid';
import styled from 'styled-components';
import AssetLibrary from '@/features/assetLibrary';
import { bgColors, grayColors } from '@/resources/colors/colors';
import storeContainer from '@/store/storeContainer';
import PreviewCamera from '@/three_components/camera/PreivewCamera';
import PointLight from '@/three_components/lights/PointLight';
import SpotLight from '@/three_components/lights/SpotLight';
import CapsulePrimitive from '@/three_components/primitives/CapsulePrimitive';
import ConePrimitive from '@/three_components/primitives/ConePrimitive';
import CubePrimitive from '@/three_components/primitives/CubePrimitive';
import CylinderPrimitive from '@/three_components/primitives/CylinderPrimitive';
import SpherePrimitive from '@/three_components/primitives/SpherePrimitive';
import TorusPrimitive from '@/three_components/primitives/TorusPrimitive';
import { useToast } from '@hooks/useToast';
import Button from './common/Button';

const CanvasBar = () => {
  const { primitiveStore, projectStateStore } = storeContainer;
  const { addToast } = useToast();

  const hasPreviewCamera = () => {
    return Object.values(primitiveStore.meshes).find(
      (value) => value.name === 'PREVIEW_CAMERA'
    );
  };

  return (
    <Wrapper>
      <Container height="70px">
        <CanvasBtnWrapper width="93px">
          <Button
            size="86px"
            shadow="none"
            backgroundImage="/icons/studio/btn_library.svg"
            hoverBackgroundImage="/icons/studio/btn_library_active.svg"
            onClick={() => {
              projectStateStore.updateModalComponent(<AssetLibrary />);
              projectStateStore.updateModalState(true);
            }}
          />
        </CanvasBtnWrapper>
        <CanvasBtnWrapper width="326px">
          <Button
            size="50px"
            shadow="none"
            backgroundImage="/icons/studio/btn_cube.svg"
            hoverBackgroundImage="/icons/studio/btn_cube_active.svg"
            onClick={() => {
              addToast('큐브가 추가되었습니다'); //[TBD] should be deleted on production
              const storeId = nanoid();
              primitiveStore.addPrimitive(
                storeId,
                <CubePrimitive storeId={storeId} />
              );
            }}
          />
          <Button
            size="50px"
            shadow="none"
            backgroundImage="/icons/studio/btn_sphere.svg"
            hoverBackgroundImage="/icons/studio/btn_sphere_active.svg"
            onClick={() => {
              addToast('구가 추가되었습니다'); //[TBD] should be deleted on production
              const storeId = nanoid();
              primitiveStore.addPrimitive(
                storeId,
                <SpherePrimitive storeId={storeId} />
              );
            }}
          />
          <Button
            size="50px"
            shadow="none"
            backgroundImage="/icons/studio/btn_cylinder.svg"
            hoverBackgroundImage="/icons/studio/btn_cylinder_active.svg"
            onClick={() => {
              const storeId = nanoid();
              primitiveStore.addPrimitive(
                storeId,
                <CylinderPrimitive storeId={storeId} />
              );
            }}
          />
          <Button
            size="50px"
            shadow="none"
            backgroundImage="/icons/studio/btn_cone.svg"
            hoverBackgroundImage="/icons/studio/btn_cone_active.svg"
            onClick={() => {
              const storeId = nanoid();
              primitiveStore.addPrimitive(
                storeId,
                <ConePrimitive storeId={storeId} />
              );
            }}
          />
          <Button
            size="50px"
            shadow="none"
            backgroundImage="/icons/studio/btn_Torus.svg"
            hoverBackgroundImage="/icons/studio/btn_Torus_active.svg"
            onClick={() => {
              const storeId = nanoid();
              primitiveStore.addPrimitive(
                storeId,
                <TorusPrimitive storeId={storeId} />
              );
            }}
          />
          <Button
            size="50px"
            shadow="none"
            backgroundImage="/icons/studio/btn_capsule.svg"
            hoverBackgroundImage="/icons/studio/btn_capsule_active.svg"
            onClick={() => {
              const storeId = nanoid();
              primitiveStore.addPrimitive(
                storeId,
                <CapsulePrimitive storeId={storeId} />
              );
            }}
          />
        </CanvasBtnWrapper>
        <CanvasBtnWrapper width="164px">
          <Button
            size="74px"
            shadow="none"
            backgroundImage="/icons/studio/btn_포인트_라이트.svg"
            hoverBackgroundImage="/icons/studio/btn_포인트_라이트_활성화.svg"
            onClick={() => {
              const storeId = nanoid();
              primitiveStore.addPrimitive(
                storeId,
                <PointLight storeId={storeId} />
              );
            }}
          />
          <Button
            size="74px"
            shadow="none"
            backgroundImage="/icons/studio/btn_스포트_라이트.svg"
            hoverBackgroundImage="/icons/studio/btn_스포트_라이트_활성화.svg"
            onClick={() => {
              const storeId = nanoid();
              primitiveStore.addPrimitive(
                storeId,
                <SpotLight storeId={storeId} />
              );
            }}
          />
        </CanvasBtnWrapper>
        <CanvasBtnWrapper width="76px">
          <Button
            size="50px"
            shadow="none"
            backgroundImage="/icons/studio/btn_카메라.svg"
            hoverBackgroundImage="/icons/studio/btn_카메라_활성화.svg"
            onClick={() => {
              if (hasPreviewCamera()) {
                addToast('카메라는 한 개만 추가할 수 있습니다.');
                return;
              }
              const storeId = nanoid();
              primitiveStore.addPrimitive(
                storeId,
                <PreviewCamera storeId={storeId} />
              );
            }}
          />
        </CanvasBtnWrapper>
        <PaddingBox />
      </Container>
      <Container height="30px">
        <CanvasBtnWrapper width="420px">
          <ButtonGroupName>에셋</ButtonGroupName>
        </CanvasBtnWrapper>
        <CanvasBtnWrapper width="241px">
          <ButtonGroupName>이펙트</ButtonGroupName>
        </CanvasBtnWrapper>
        <PaddingBox />
      </Container>
    </Wrapper>
  );
};

const Observer = observer(CanvasBar);
export default Observer;

const Wrapper = styled.div`
  width: 100%;
  height: 88px;
  display: flex;
  z-index: 1;
  flex-direction: column;
  align-items: center;
  background-color: ${bgColors[282828]};
`;

const Container = styled.div<{ height: string }>`
  width: 100%;
  z-index: 1;
  height: ${(props) => props.height};
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${bgColors['1c1c1c']};
`;

const CanvasBtnWrapper = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  height: 100%;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid ${bgColors['1c1c1c']};
`;

const PaddingBox = styled.div`
  height: 100%;
  flex-grow: 1;
  border: 1px solid ${bgColors['1c1c1c']};
`;

const ButtonGroupName = styled.span`
  font-size: 10px;
  color: ${grayColors['808080']};
  align-self: center;
`;
