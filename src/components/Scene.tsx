import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import styled from "styled-components";
import { gridColor, basicColors, bgColors } from "@/resources/colors/colors";

const Wrapper = styled.div`
  width: 100%;
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

const createGrid = () => {
  const axisLength = 25;
  const xAxisGeometry = new Float32Array([axisLength, 0, 0, -axisLength, 0, 0]);
  const yAxisGeometry = new Float32Array([0, 0, axisLength, 0, 0, -axisLength]);

  // Create BufferGeometry instances using the defined BufferAttributes
  const xAxisBufferGeometry = new THREE.BufferGeometry();
  const yAxisBufferGeometry = new THREE.BufferGeometry();

  // Set the position attribute using setAttribute
  xAxisBufferGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(xAxisGeometry, 3)
  );
  yAxisBufferGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(yAxisGeometry, 3)
  );
  return (
    <>
      <group>
        <mesh position={[0, 0, 0]}>
          <gridHelper args={[50, 50, , gridColor.gray]} />
          <gridHelper args={[50, 10, , gridColor.black]} />
        </mesh>

        <group>
          <mesh position={[0, 0, 0]}>
            <line>
              <bufferGeometry attach="geometry" {...xAxisBufferGeometry}>
                <bufferAttribute
                  attach="position"
                  count={2}
                  array={
                    new Float32Array([axisLength, 0, 0, -axisLength, 0, 0])
                  }
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial
                attach="material"
                color={gridColor.Xaxis}
                fog={false}
                toneMapped={false}
                transparent={true}
              />
            </line>

            {/* y axis */}
            <line>
              <bufferGeometry attach="geometry" {...yAxisBufferGeometry}>
                <bufferAttribute
                  attach="position"
                  count={2}
                  array={
                    new Float32Array([0, 0, axisLength, 0, 0, -axisLength])
                  }
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial
                attach="material"
                color={gridColor.Yaxis}
                fog={false}
                toneMapped={false}
                transparent={true}
              />
            </line>
          </mesh>
        </group>
      </group>
    </>
  );
};

function Scene() {
  return (
    <Wrapper>
      <Container>
        <Canvas
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: bgColors.sceneBackground,
          }}
          camera={{ fov: 50, position: [0, 2, 3.0] }}
        >
          <ambientLight
            intensity={0.3}
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
          {createGrid()}
          <OrbitControls enableDamping={false} />
        </Canvas>
      </Container>
    </Wrapper>
  );
}

export default Scene;
