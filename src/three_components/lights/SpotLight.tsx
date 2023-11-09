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
  const { primitiveStore } = storeContainer;
  const geometry = new THREE.ConeGeometry(0.57, 1.38, 8);
  const material = new THREE.MeshPhysicalMaterial();
  material.wireframe = true;
  material.transparent = true;

  const mesh = props.propMesh ?? new THREE.Mesh(geometry, material);
  mesh.name = 'SPOT_LIGHT';
  mesh.userData['storeId'] = props.storeId;
  mesh.userData['isLocked'] = false;

  useEffect(() => {
    const spotLight = spotLightGlb.children[0].children[0] as THREE.SpotLight;
    mesh.add(spotLight);
    primitiveStore.updatePrimitive(props.storeId, mesh);

    const target = new THREE.Mesh(
      new THREE.BoxGeometry(),
      new THREE.MeshBasicMaterial()
    );
    target.visible = false;
    mesh.add(target);
    target.position.set(0, -10, 0);
    spotLight.target = target;

    // history 추가 필요
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
