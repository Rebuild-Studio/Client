import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { observer } from 'mobx-react';
import storeContainer from '@/store/storeContainer';

interface Props {
  storeId: string;
  light?: THREE.PointLight;
}

const PointLight = ({ storeId, light }: Props) => {
  const ref = useRef();
  const { primitiveStore } = storeContainer;
  const geometry = new THREE.SphereGeometry(0.23, 16, 8);
  const material = new THREE.MeshPhysicalMaterial();
  material.wireframe = true;
  material.transparent = true;
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = 'POINT_LIGHT';
  mesh.userData['storeId'] = storeId;
  mesh.userData['isLocked'] = false;
  const pointLight = light || new THREE.PointLight();

  useEffect(() => {
    mesh.attach(pointLight);
    pointLight.getWorldPosition(mesh.position);
    pointLight.getWorldQuaternion(mesh.quaternion);
    primitiveStore.updatePrimitive(storeId, mesh);
    // history 추가 필요
  }, []);

  return (
    <>
      <primitive ref={ref} object={primitiveStore.meshes[storeId] ?? mesh} />
    </>
  );
};

const Observer = observer(PointLight);
export default Observer;
