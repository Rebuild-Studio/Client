import { ViewCube } from "./ViewCube";
import { basicColors } from "@/resources/colors/colors";
import { observer } from "mobx-react";
import { Canvas } from "@react-three/fiber";
import styled from "styled-components";

const CanvasWrapper = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  top: 50px;
  left: 50px;
  z-index: 1;
`;

const CustomCanvas = styled(Canvas)`
  width: "100%";
  height: "100%";
`;
export const OrientationHelper = observer(() => {
  return (
    <CanvasWrapper>
      <CustomCanvas>
        <ambientLight intensity={1} visible={true} color={basicColors.white} />
        <directionalLight
          castShadow
          shadow-bias={-0.0001}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          intensity={2.5}
          color={basicColors.white}
          position={[-10, 18, 11.5]}
          visible={true}
          shadow-camera-left={-30}
          shadow-camera-right={30}
          shadow-camera-top={30}
          shadow-camera-bottom={-30}
        ></directionalLight>
        <ViewCube scale={[3, 3, 3]} />
      </CustomCanvas>
    </CanvasWrapper>
  );
});
