import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { observer } from 'mobx-react';
import storeContainer from '@/store/storeContainer';
import canvasHistoryStore from '@store/canvasHistory.store.ts';
import { PrimitiveProps } from '../common/PrimitiveProps';
import { getDefaultMaterialSetting } from '../utils/materialSetting';

interface TorusParams {
  minRadius: number;
  maxRadius: number;
  radiusUnit: number;
  minTube: number;
  maxTube: number;
  tubeUnit: number;
  minRadialSegments: number;
  maxRadialSegments: number;
  radialSegmentsUnit: number;
  minTubularSegments: number;
  maxTubularSegments: number;
  tubularSegmentsUnit: number;
  minArc: number;
  maxArc: number;
  arcUnit: number;
}

const initTorus: TorusParams = {
  minRadius: 0,
  maxRadius: 20,
  radiusUnit: 0.02,
  minTube: 0.1,
  maxTube: 10,
  tubeUnit: 0.01,
  minRadialSegments: 2,
  maxRadialSegments: 30,
  radialSegmentsUnit: 1,
  minTubularSegments: 3,
  maxTubularSegments: 200,
  tubularSegmentsUnit: 2,
  minArc: 0,
  maxArc: Math.PI * 2,
  arcUnit: 0.06
};

const TorusPrimitive = (props: PrimitiveProps) => {
  const ref = useRef();
  const { primitiveStore } = storeContainer;
  const geometry = new THREE.TorusGeometry(0.5, 0.2, 16, 100, Math.PI * 2);
  const material = getDefaultMaterialSetting();
  material.transparent = true;
  const mesh = props.propMesh ?? new THREE.Mesh(geometry, material);
  mesh.name = 'TORUS';
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

const Observer = observer(TorusPrimitive);
export default Observer;

export type { TorusParams };
export { initTorus };
