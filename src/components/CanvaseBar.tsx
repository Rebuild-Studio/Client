import styled from "styled-components";
import Button from "./common/Button";
import { bgColors } from "@/resources/colors/colors";

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

const CanvasBtnWrapper = styled.div<{ width?: string }>`
  width: ${(props) => props.width};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${bgColors["1c1c1c"]};
`;

const CavasBar = (props: Props) => {
  return (
    <Wrapper>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "70px",
          alignItems: "center",
        }}
      >
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
          />
          <Button
            size="50px"
            shadow="none"
            backgroundImage="/Icons/Studio/btn_sphere.svg"
            hoverBackgroundImage="/Icons/Studio/btn_sphere_active.svg"
          />
          <Button
            size="50px"
            shadow="none"
            backgroundImage="/Icons/Studio/btn_cylinder.svg"
            hoverBackgroundImage="/Icons/Studio/btn_cylinder_active.svg"
          />
          <Button
            size="50px"
            shadow="none"
            backgroundImage="/Icons/Studio/btn_cone.svg"
            hoverBackgroundImage="/Icons/Studio/btn_cone_active.svg"
          />
          <Button
            size="50px"
            shadow="none"
            backgroundImage="/Icons/Studio/btn_Torus.svg"
            hoverBackgroundImage="/Icons/Studio/btn_Torus_active.svg"
          />
          <Button
            size="50px"
            shadow="none"
            backgroundImage="/Icons/Studio/btn_capsule.svg"
            hoverBackgroundImage="/Icons/Studio/btn_capsule_active.svg"
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
        <div
          style={{
            height: "100%",
            flexGrow: 1,
            border: `1px solid ${bgColors["1c1c1c"]}`,
          }}
        />
      </div>
      <div
        style={{
          height: "30px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <CanvasBtnWrapper width="421px">
          <span style={{ fontSize: 10, color: "gray", alignSelf: "center" }}>
            에셋
          </span>
        </CanvasBtnWrapper>
        <CanvasBtnWrapper width="242px">
          <span style={{ fontSize: 10, color: "gray", alignSelf: "center" }}>
            이펙트
          </span>
        </CanvasBtnWrapper>
      </div>
    </Wrapper>
  );
};

export default CavasBar;
