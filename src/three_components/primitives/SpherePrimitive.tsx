import { useEffect, useId, useRef } from "react";
import * as THREE from "three";
import { getDefaultMaterialSetting } from "../common/materialSetting";
import primitiveStore from "@/store/primitiveStore";

interface SphereParams {
  minWidthSegments: number;
  maxWidthSegments: number;
  widthSegmentUnit: number;
  minHeightSegments: number;
  maxHeightSegments: number;
  heightSegmentUnit: number;
  minPhiLength: number;
  maxPhiLength: number;
  phiLengthUnit: number;
  minThetaStart: number;
  maxThetaStart: number;
  thetaStartUnit: number;
  minThetaLength: number;
  maxThetaLength: number;
  thetaLengthUnit: number;
}

const initSphere: SphereParams = {
  minWidthSegments: 3,
  maxWidthSegments: 64,
  widthSegmentUnit: 1,
  minHeightSegments: 2,
  maxHeightSegments: 32,
  heightSegmentUnit: 1,
  minPhiLength: 0,
  maxPhiLength: Math.PI * 2,
  phiLengthUnit: 0.06,
  minThetaStart: 0,
  maxThetaStart: Math.PI * 2,
  thetaStartUnit: 0.06,
  minThetaLength: 0,
  maxThetaLength: Math.PI * 2,
  thetaLengthUnit: 0.06,
};

const SpherePrimitive = () => {
  const ref = useRef();
  const uuid = useId();
  const store = primitiveStore;
  const geometry = new THREE.SphereGeometry(
    0.5,
    32,
    16,
    0,
    Math.PI * 2,
    0,
    Math.PI * 2
  );
  const material = getDefaultMaterialSetting();
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = "SPHERE";
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

export type { SphereParams };
export { initSphere };
export default SpherePrimitive;
