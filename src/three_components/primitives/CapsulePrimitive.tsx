import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { observer } from 'mobx-react';
import storeContainer from '@/store/storeContainer';
import canvasHistoryStore from '@store/canvasHistory.store.ts';
import { PrimitiveProps } from '../common/PrimitiveProps';
import { getDefaultMaterialSetting } from '../utils/materialSetting';

interface CapsuleParams {
  minRadius: number;
  maxRadius: number;
  radiusUnit: number;
  minLength: number;
  maxLength: number;
  lengthUnit: number;
  minCapSegments: number;
  maxCapSegments: number;
  capSegmentsUnit: number;
  minRadialSegments: number;
  maxRadialSegments: number;
  radialSegments: number;
}

const initCapsule: CapsuleParams = {
  minRadius: 0,
  maxRadius: 30,
  radiusUnit: 0.01,
  minLength: 0,
  maxLength: 30,
  lengthUnit: 0.1,
  minCapSegments: 1,
  maxCapSegments: 32,
  capSegmentsUnit: 1,
  minRadialSegments: 1,
  maxRadialSegments: 64,
  radialSegments: 1
};

const CapsulePrimitive = (props: PrimitiveProps) => {
  const ref = useRef();
  const { primitiveStore } = storeContainer;
  const geometry = new THREE.CapsuleGeometry(0.25, 1, 10, 20);
  const material = getDefaultMaterialSetting();
  material.transparent = true;
  const mesh = props.propMesh ?? new THREE.Mesh(geometry, material);
  mesh.name = 'CAPSULE';
  mesh.userData['storeId'] = props.storeId;
  mesh.userData['isLocked'] = false;

  useEffect(() => {
    primitiveStore.updatePrimitive(mesh.userData['storeId'], mesh);
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

const Observer = observer(CapsulePrimitive);
export default Observer;

export type { CapsuleParams };
export { initCapsule };
