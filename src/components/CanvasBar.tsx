import Button from "./common/Button";
import storeContainer from "@/store/storeContainer";
import CubePrimitive from "@/three_components/primitives/CubePrimitive";
import SpherePrimitive from "@/three_components/primitives/SpherePrimitive";
import CylinderPrimitive from "@/three_components/primitives/CylinderPrimitive";
import ConePrimitive from "@/three_components/primitives/ConePrimitive";
import TorusPrimitive from "@/three_components/primitives/TorusPrimitive";
import CapsulePrimitive from "@/three_components/primitives/CapsulePrimitive";
import { nanoid } from "nanoid";
import styled from "styled-components";
import { bgColors, grayColors } from "@/resources/colors/colors";
import canvasHistoryStore from "@/store/canvasHistoryStore";
import { action, flowResult } from "mobx";
import { observer } from "mobx-react";

interface Props {}

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
  border-bottom: 1px solid ${bgColors["1c1c1c"]};
`;

const CanvasBtnWrapper = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  height: 100%;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid ${bgColors["1c1c1c"]};
`;

const PaddingBox = styled.div`
  height: 100%;
  flex-grow: 1;
  border: 1px solid ${bgColors["1c1c1c"]};
`;

const ButtonGroupName = styled.span`
  font-size: 10px;
  color: ${grayColors["808080"]};
  align-self: center;
`;

const CanvasBar = observer((props: Props) => {
  const { primitiveStore } = storeContainer;

  return (
    <Wrapper>
      <Container height="70px">
        <CanvasBtnWrapper width="93px">
          <Button
            size="86px"
            shadow="none"
            backgroundImage="/Icons/Studio/btn_library.svg"
            hoverBackgroundImage="/Icons/Studio/btn_library_active.svg"
          />
        </CanvasBtnWrapper>
        <CanvasBtnWrapper width="326px">
          <Button
            size="50px"
            shadow="none"
            backgroundImage="/Icons/Studio/btn_cube.svg"
            hoverBackgroundImage="/Icons/Studio/btn_cube_active.svg"
            onClick={() => {
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
            backgroundImage="/Icons/Studio/btn_sphere.svg"
            hoverBackgroundImage="/Icons/Studio/btn_sphere_active.svg"
            onClick={() => {
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
            backgroundImage="/Icons/Studio/btn_cylinder.svg"
            hoverBackgroundImage="/Icons/Studio/btn_cylinder_active.svg"
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
            backgroundImage="/Icons/Studio/btn_cone.svg"
            hoverBackgroundImage="/Icons/Studio/btn_cone_active.svg"
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
            backgroundImage="/Icons/Studio/btn_Torus.svg"
            hoverBackgroundImage="/Icons/Studio/btn_Torus_active.svg"
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
            backgroundImage="/Icons/Studio/btn_capsule.svg"
            hoverBackgroundImage="/Icons/Studio/btn_capsule_active.svg"
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
            backgroundImage="/Icons/Studio/btn_포인트_라이트.svg"
            hoverBackgroundImage="/Icons/Studio/btn_포인트_라이트_활성화.svg"
          />
          <Button
            size="74px"
            shadow="none"
            backgroundImage="/Icons/Studio/btn_스포트_라이트.svg"
            hoverBackgroundImage="/Icons/Studio/btn_스포트_라이트_활성화.svg"
          />
        </CanvasBtnWrapper>
        <CanvasBtnWrapper width="76px">
          <Button
            size="50px"
            shadow="none"
            backgroundImage="/Icons/Studio/btn_카메라.svg"
            hoverBackgroundImage="/Icons/Studio/btn_카메라_활성화.svg"
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
});

export default CanvasBar;
