import { useEffect, useRef } from "react";
import * as THREE from "three";
import { getDefaultMaterialSetting } from "../utils/materialSetting";
import { observer } from "mobx-react";
import storeContainer from "@/store/storeContainer";
import { PrimitiveProps } from "../common/PrimitiveProps";
import Gizmo from "../gizmo/Gizmo";

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

const SpherePrimitive = observer((props: PrimitiveProps) => {
  const ref = useRef();
  const { primitiveStore } = storeContainer;
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
  mesh.userData["storeId"] = props.storeId;
  mesh.userData["isLocked"] = false;

  useEffect(() => {
    primitiveStore.updatePrimitive(mesh.userData["storeId"], mesh);
  }, []);

  return (
    <>
      {Object.keys(primitiveStore.selectedPrimitives).length < 2 && (
        <Gizmo storeId={props.storeId} />
      )}
      <primitive
        ref={ref}
        object={primitiveStore.meshes[props.storeId] ?? mesh}
      />
    </>
  );
});

export type { SphereParams };
export { initSphere };
export default SpherePrimitive;
