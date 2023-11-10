import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { observer } from 'mobx-react';
import storeContainer from '@/store/storeContainer';

interface Props {
  storeId: string;
  light?: THREE.SpotLight;
}

const SpotLight = ({ storeId, light }: Props) => {
  const ref = useRef();
  const { primitiveStore } = storeContainer;
  const geometry = new THREE.ConeGeometry(0.57, 1.38, 8);
  const material = new THREE.MeshPhysicalMaterial();
  material.wireframe = true;
  material.transparent = true;

  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = 'SPOT_LIGHT';
  mesh.userData['storeId'] = storeId;
  mesh.userData['isLocked'] = false;
  const spotLight = light || new THREE.SpotLight();

  useEffect(() => {
    mesh.attach(spotLight);
    spotLight.getWorldPosition(mesh.position);
    spotLight.getWorldQuaternion(mesh.quaternion);
    primitiveStore.updatePrimitive(storeId, mesh);

    if (!light) {
      const target = new THREE.Mesh(
        new THREE.BoxGeometry(),
        new THREE.MeshBasicMaterial()
      );
      target.visible = false;
      target.position.set(0, -10, 0);
      spotLight.add(target);
      spotLight.target = target;
    }

    // history 추가 필요
  }, []);

  return (
    <>
      <primitive ref={ref} object={primitiveStore.meshes[storeId] ?? mesh} />
    </>
  );
};

const Observer = observer(SpotLight);
export default Observer;
