import { MeshProps, useFrame } from "@react-three/fiber";
import { useServerTextureLoader } from "../../hooks/loader";
import { useRef } from "react";
import renderStore from "@/store/renderStore";
import * as THREE from "three";

export const ViewCube = (props: MeshProps) => {
  const textures = useServerTextureLoader(
    Array.from({ length: 6 }, (_, idx) => `${idx + 1}.png`),
    "models/CameraCube/"
  );

  const ref = useRef<THREE.Mesh>(null!);
  const euler = new THREE.Euler();

  useFrame(() => {
    if (!ref.current || !renderStore.camera) return;

    euler.setFromRotationMatrix(renderStore.camera.matrixWorldInverse);
    ref.current.rotation.copy(euler);
  });

  return (
    <mesh ref={ref} {...props}>
      {textures.map((value, idx) => (
        <meshStandardMaterial
          key={idx + value.uuid}
          attach={`material-${idx}`}
          map={value}
        />
      ))}
      <boxGeometry />
    </mesh>
  );
};
