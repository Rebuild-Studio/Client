import { useLoader, useThree } from "@react-three/fiber";
import { RGBELoader } from "three-stdlib";
import * as THREE from "three";
import { Environment } from "@react-three/drei";
import getMinioPath from "@/utils/path/minio";
import { observer } from "mobx-react";
import sceneSettingStore from "@/store/sceneSettingStore";
import { hsvaToHex } from "@uiw/color-convert";
import { useEffect } from "react";
import { bgColors } from "@/resources/colors/colors";

export const SceneEnvironment = observer(() => {
  const {
    selectedBackgroundImage,
    hdriToggle,
    hdriIntensity,
    hdriXRotation,
    hdriYRotation,
    hdriZRotation,
    ambientLightIntensity,
    ambientLightToggle,
    ambientLightColor,
    directionalLightToggle,
    directionalLightIntensity,
    directionalLightColor,
    canvasBackgroundColor,
    canvasBackgroundColorToggle,
    hdriBackgroundVisibleToggle,
  } = sceneSettingStore;
  const texture = useLoader(
    RGBELoader,
    getMinioPath(selectedBackgroundImage, "libraryHDR")
  );

  // 캔버스 배경색
  const scene = useThree((state) => state.scene);
  useEffect(() => {
    if (canvasBackgroundColorToggle) {
      scene.background = new THREE.Color(hsvaToHex(canvasBackgroundColor));
    } else {
      scene.background = new THREE.Color(bgColors.sceneBackground);
    }
  }, [canvasBackgroundColorToggle, canvasBackgroundColor]);

  return (
    <>
      {hdriToggle && (
        <Environment background={hdriBackgroundVisibleToggle}>
          <color attach="background" args={["black"]} />
          <mesh
            rotation={[
              hdriXRotation,
              hdriYRotation * (Math.PI / 180),
              hdriZRotation,
            ]}
            scale={100}
          >
            <sphereGeometry />
            <meshBasicMaterial
              transparent
              opacity={hdriIntensity}
              map={texture}
              side={THREE.BackSide}
              toneMapped={false}
            />
          </mesh>
        </Environment>
      )}
      <ambientLight
        intensity={ambientLightIntensity}
        visible={ambientLightToggle}
        color={hsvaToHex(ambientLightColor)}
      />
      <directionalLight
        castShadow
        shadow-bias={-0.0001}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        intensity={directionalLightIntensity}
        color={hsvaToHex(directionalLightColor)}
        position={[-10, 18, 11.5]}
        visible={directionalLightToggle}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />
    </>
  );
});
