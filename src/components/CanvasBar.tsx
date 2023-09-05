import Button from "./common/Button";
import styled from "styled-components";
import { bgColors, grayColors } from "@/resources/colors/colors";

interface Props {}

const Wrapper = styled.div`
  width: 100%;
  height: 88px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${bgColors[282828]};
  border: 1px solid ${bgColors["1c1c1c"]};
`;

const Container = styled.div<{ height: string }>`
  width: 100%;
  height: ${(props) => props.height};
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${bgColors["1c1c1c"]};
`;

const CanvasBtnWrapper = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  height: 100%;
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

const CavasBar = (props: Props) => {
  return (
    <Wrapper>
      <Container height="70px">
        <CanvasBtnWrapper width="93px">
          <Button
            size="86px"
            shadow="none"
            backgroundImage="/icons/studio/btn_library.svg"
            hoverBackgroundImage="/icons/studio/btn_library_active.svg"
          />
        </CanvasBtnWrapper>
        <CanvasBtnWrapper width="326px">
          <Button
            size="50px"
            shadow="none"
            backgroundImage="/icons/studio/btn_cube.svg"
            hoverBackgroundImage="/icons/studio/btn_cube_active.svg"
          />
          <Button
            size="50px"
            shadow="none"
            backgroundImage="/icons/studio/btn_sphere.svg"
            hoverBackgroundImage="/icons/studio/btn_sphere_active.svg"
          />
          <Button
            size="50px"
            shadow="none"
            backgroundImage="/icons/studio/btn_cylinder.svg"
            hoverBackgroundImage="/icons/studio/btn_cylinder_active.svg"
          />
          <Button
            size="50px"
            shadow="none"
            backgroundImage="/icons/studio/btn_cone.svg"
            hoverBackgroundImage="/icons/studio/btn_cone_active.svg"
          />
          <Button
            size="50px"
            shadow="none"
            backgroundImage="/icons/studio/btn_Torus.svg"
            hoverBackgroundImage="/icons/studio/btn_Torus_active.svg"
          />
          <Button
            size="50px"
            shadow="none"
            backgroundImage="/icons/studio/btn_capsule.svg"
            hoverBackgroundImage="/icons/studio/btn_capsule_active.svg"
          />
        </CanvasBtnWrapper>
        <CanvasBtnWrapper width="164px">
          <Button
            size="74px"
            shadow="none"
            backgroundImage="/icons/studio/btn_포인트_라이트.svg"
            hoverBackgroundImage="/icons/studio/btn_포인트_라이트_활성화.svg"
          />
          <Button
            size="74px"
            shadow="none"
            backgroundImage="/icons/studio/btn_스포트_라이트.svg"
            hoverBackgroundImage="/icons/studio/btn_스포트_라이트_활성화.svg"
          />
        </CanvasBtnWrapper>
        <CanvasBtnWrapper width="76px">
          <Button
            size="50px"
            shadow="none"
            backgroundImage="/icons/studio/btn_카메라.svg"
            hoverBackgroundImage="/icons/studio/btn_카메라_활성화.svg"
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

export default CavasBar;
