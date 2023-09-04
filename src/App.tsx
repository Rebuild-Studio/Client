import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import CubePrimitive from "./three_components/primitives/CubePrimitive";

function App() {
  return (
    <>
      <Canvas>
        <CubePrimitive />
      </Canvas>
    </>
  );
}

export default App;
