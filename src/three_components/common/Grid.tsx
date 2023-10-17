import * as THREE from "three";
import { gridColor } from "@resources/colors/colors";

const Grid = () => {
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

export default Grid;
