import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import RenderScene from "../scene/RenderScene";
import Grid from "./Grid";
import styled from "styled-components";
import { basicColors, bgColors } from "@/resources/colors/colors";

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  top: 78px;
  height: calc(100vh - ${78}px);
  display: flex;
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  bottom: 0%;
  display: flex;
  flex-direction: column;
`;

const CustomCanvas = styled(Canvas)`
  width: "100%";
  height: "100%";
  background-color: ${bgColors.sceneBackground};
`;

const Scene = () => {
  return (
    <Wrapper>
      <Container>
        <CustomCanvas camera={{ fov: 50, position: [0, 2, 3.0] }}>
          <ambientLight
            intensity={1}
            visible={true}
            color={basicColors.white}
          />
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
          <Grid />
          <OrbitControls enableDamping={false} />
          <RenderScene />
        </CustomCanvas>
      </Container>
    </Wrapper>
  );
};

export default Scene;
