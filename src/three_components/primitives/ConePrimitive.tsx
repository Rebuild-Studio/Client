import { useEffect, useId, useRef } from "react";
import * as THREE from "three";
import { getDefaultMaterialSetting } from "../common/materialSetting";
import primitiveStore from "@/store/primitiveStore";

interface ConeParams {
  minRadius: number;
  maxRadius: number;
  radiusUnit: number;
  minRadialSegments: number;
  maxRadialSegments: number;
  radialSegmentsUnit: number;
  toggleOpenEnded: boolean;
  minThetaLength: number;
  maxThetaLength: number;
  thetaLengthUnit: number;
}

const initCone: ConeParams = {
  minRadius: 0,
  maxRadius: 30,
  radiusUnit: 0.1,
  minRadialSegments: 3,
  maxRadialSegments: 64,
  radialSegmentsUnit: 1,
  toggleOpenEnded: false,
  minThetaLength: 0,
  maxThetaLength: Math.PI * 2,
  thetaLengthUnit: 0.06,
};

const ConePrimitive = () => {
  const ref = useRef();
  const uuid = useId();
  const store = primitiveStore;
  const geometry = new THREE.ConeGeometry(0.5, 1, 32, 1, false, 0, Math.PI * 2);
  const material = getDefaultMaterialSetting();
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = "CONE";
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

export type { ConeParams };
export { initCone };
export default ConePrimitive;
