import { useEffect, useId, useRef } from "react";
import * as THREE from "three";
import { getDefaultMaterialSetting } from "../common/materialSetting";
import primitiveStore from "@/store/primitiveStore";

interface CylinderParams {
  minRadiusTop: number;
  maxRadiusTop: number;
  radiusTopUnit: number;
  minRadiusBottom: number;
  maxRadiusBottom: number;
  radiusBottomUnit: number;
  minRadialSegments: number;
  maxRadialSegments: number;
  radialSegmentsUnit: number;
  toggleOpenEnded: boolean;
  minThetaLength: number;
  maxThetaLength: number;
  thetaLengthUnit: number;
}

const initCylinder: CylinderParams = {
  minRadiusTop: 0,
  maxRadiusTop: 30,
  radiusTopUnit: 0.1,
  minRadiusBottom: 0,
  maxRadiusBottom: 30,
  radiusBottomUnit: 0.1,
  minRadialSegments: 3,
  maxRadialSegments: 64,
  radialSegmentsUnit: 1,
  toggleOpenEnded: false,
  minThetaLength: 0,
  maxThetaLength: Math.PI * 2,
  thetaLengthUnit: 0.06,
};

const CylinderPrimitive = () => {
  const ref = useRef();
  const uuid = useId();
  const store = primitiveStore;
  const geometry = new THREE.CylinderGeometry(
    0.5,
    0.5,
    1,
    32,
    1,
    false,
    0,
    Math.PI * 2
  );
  const material = getDefaultMaterialSetting();
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = "CYLINDER";
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

export type { CylinderParams };
export { initCylinder };
export default CylinderPrimitive;
