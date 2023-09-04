import { useEffect, useId, useRef } from "react";
import * as THREE from "three";
import { getDefaultMaterialSetting } from "../common/materialSetting";
import primitiveStore from "@/store/primitiveStore";

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
  arcUnit: 0.06,
};

const TorusPrimitive = () => {
  const ref = useRef();
  const uuid = useId();
  const store = primitiveStore;
  const geometry = new THREE.TorusGeometry(0.5, 0.2, 16, 100, Math.PI * 2);
  const material = getDefaultMaterialSetting();
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = "TORUS";
  mesh.uuid = uuid;

  useEffect(() => {
    store.addPrimitive(mesh.uuid, mesh);
  }, []);

  return (
    <primitive
      ref={ref}
      object={store.primitives[mesh.uuid] ? store.primitives[mesh.uuid] : mesh}
    />
  );
};

export type { TorusParams };
export { initTorus };
export default TorusPrimitive;
