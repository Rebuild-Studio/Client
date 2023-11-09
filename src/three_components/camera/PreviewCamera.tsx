import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useServerGLTFLoader } from '@/hooks/loader';
import storeContainer from '@/store/storeContainer';
import { PrimitiveProps } from '../common/PrimitiveProps';

const PreviewCamera = (props: PrimitiveProps) => {
  const ref = useRef();
  const { primitiveStore } = storeContainer;
  const cameraObject = useServerGLTFLoader(
    '/glb/camera/cinematicCamera.glb'
  ).scene.clone();
  const perspectiveCamera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  // perspective camera와 카메라 모양 object를 가질 보이지 않는 mesh 생성
  const geometry = new THREE.BoxGeometry(0.9, 0.7, 0.3);
  const material = new THREE.MeshPhysicalMaterial();
  material.visible = false;
  const mesh = props.propMesh ?? new THREE.Mesh(geometry, material);
  mesh.name = 'PREVIEW_CAMERA';
  mesh.userData['storeId'] = props.storeId;
  mesh.userData['isLocked'] = false;

  useEffect(() => {
    if (!props.propMesh) {
      mesh.attach(cameraObject);
      mesh.attach(perspectiveCamera);
    }

    primitiveStore.updatePrimitive(props.storeId, mesh);
  }, []);
  return (
    <primitive
      ref={ref}
      object={primitiveStore.meshes[props.storeId] ?? mesh}
    />
  );
};

export default PreviewCamera;
