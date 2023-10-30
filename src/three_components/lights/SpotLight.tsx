import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { observer } from 'mobx-react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import storeContainer from '@/store/storeContainer';
import { PrimitiveProps } from '../common/PrimitiveProps';

const SpotLight = (props: PrimitiveProps) => {
  const ref = useRef();
  const spotLightGlb: THREE.Mesh = useLoader(
    GLTFLoader,
    '/glb/light/spot_light.glb'
  ).scene.clone();
  const { primitiveStore, canvasHistoryStore } = storeContainer;
  const geometry = new THREE.ConeGeometry(0.57, 1.38, 8);
  const material = new THREE.MeshPhysicalMaterial();
  material.wireframe = true;
  material.transparent = true;

  const mesh = props.propMesh ?? new THREE.Mesh(geometry, material);
  mesh.name = 'SPOT_LIGHT';
  mesh.userData['storeId'] = props.storeId;
  mesh.userData['isLocked'] = false;

  useEffect(() => {
    mesh.attach(spotLightGlb.children[0].children[0]);
    primitiveStore.updatePrimitive(props.storeId, mesh);
    canvasHistoryStore.differAdd(mesh.userData['storeId']);
  }, []);

  return (
    <>
      <primitive
        ref={ref}
        object={primitiveStore.meshes[props.storeId] ?? mesh}
      />
    </>
  );
};

const Observer = observer(SpotLight);
export default Observer;
