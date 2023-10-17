import { useRef } from "react";
import * as THREE from "three";
import { MeshProps, useFrame } from "@react-three/fiber";
import renderStore from "@/store/renderStore";
import getMinioPath from "@/utils/path/minio";
import { useServerTextureLoader } from "@hooks/loader";

export const ViewCube = (props: MeshProps) => {
  const faceArray = [
    "RIGHT",
    "RIGHT",
    "LEFT",
    "LEFT",
    "TOP",
    "TOP",
    "BOTTOM",
    "BOTTOM",
    "FRONT",
    "FRONT",
    "BACK",
    "BACK"
  ];

  const urls = Array.from({ length: 6 }, (_, idx) =>
    getMinioPath(`${idx + 1}`, "cameraCubeMaterial")
  );
  const textures = urls.map((url) => useServerTextureLoader(url));

  const ref = useRef<THREE.Mesh>(null!);
  const euler = new THREE.Euler();

  useFrame(() => {
    if (!ref.current || !renderStore.controls) return;

    const cube = ref.current;
    const camera = renderStore.controls.camera;

    euler.setFromRotationMatrix(camera.matrixWorldInverse);
    cube.rotation.copy(euler);
  });

  const faceClick = (face: string) => {
    if (!renderStore.controls) return;

    const controls = renderStore.controls;
    const camera = controls.camera;
    const target = new THREE.Vector3();
    controls.getTarget(target);

    const dist = target.distanceTo(camera.position);

    switch (face) {
      case "TOP":
      case "BOTTOM":
        controls.setLookAt(target.x, dist, target.z, target.x, 0, target.z);
        break;
      case "FRONT":
      case "BACK":
        controls.setLookAt(target.x, target.y, dist, target.x, target.y, 0);
        break;
      case "LEFT":
      case "RIGHT":
        controls.setLookAt(dist, target.y, target.z, 0, target.y, target.z);
        break;
      default:
        break;
    }
  };

  return (
    <mesh
      ref={ref}
      scale={props.scale}
      onClick={(e) => {
        faceClick(faceArray[e.faceIndex!]);
      }}
    >
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
