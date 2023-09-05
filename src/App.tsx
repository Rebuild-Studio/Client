import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import RenderScene from "./three_components/scene/RenderScene";
import storeContainer from "./store/storeContainer";
import CubePrimitive from "./three_components/primitives/CubePrimitive";
import { nanoid } from "nanoid";

function App() {
  const { primitiveStore } = storeContainer;
  const uuid = nanoid();
  return (
    <>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <RenderScene />
      </Canvas>
      <button
        onClick={() => {
          console.log(uuid);
          primitiveStore.addPrimitive(uuid, <CubePrimitive uuid={uuid} />);
        }}
      >
        렌더링
      </button>
      <button
        onClick={() => {
          const geometry = new THREE.BoxGeometry();
          const material = new THREE.MeshPhysicalMaterial({
            color: 0x444444,
            metalness: 0,
            roughness: 0.5,
            ior: 1.45,
          });
          const mesh = new THREE.Mesh(geometry, material);
          mesh.name = uuid;
          console.log(uuid);

          primitiveStore.updatePrimitive(uuid, mesh);
        }}
      >
        변경
      </button>
      <button
        onClick={() => {
          primitiveStore.removePrimitive(uuid);
        }}
      >
        제거
      </button>
    </>
  );
}

export default App;
