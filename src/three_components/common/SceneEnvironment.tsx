import * as THREE from 'three';
import { observer } from 'mobx-react';
import { Environment } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { hsvaToHex } from '@uiw/color-convert';
import { RGBELoader } from 'three-stdlib';
import storeContainer from '@/store/storeContainer';
import getMinioPath from '@/utils/path/minio';

const SceneEnvironment = () => {
  const { sceneSettingStore } = storeContainer;
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
    hdriBackgroundVisibleToggle,
    canvasBackgroundColor
  } = sceneSettingStore;
  const texture = useLoader(
    RGBELoader,
    getMinioPath(selectedBackgroundImage, 'libraryHDR')
  );

  return (
    <>
      {hdriToggle && (
        <Environment background={hdriBackgroundVisibleToggle}>
          <color
            attach="background"
            args={[hsvaToHex(canvasBackgroundColor)]}
          />
          <mesh
            rotation={[
              hdriXRotation,
              hdriYRotation * (Math.PI / 180),
              hdriZRotation
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
};

const Observer = observer(SceneEnvironment);
export default Observer;
