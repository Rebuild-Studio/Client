import { useEffect, useRef } from "react";
import * as THREE from "three";
import { observer } from "mobx-react";
import canvasHistoryStore from "@store/canvasHistoryStore";
import storeContainer from "@store/storeContainer";
import { PrimitiveProps } from "../common/PrimitiveProps";
import { getDefaultMaterialSetting } from "../utils/materialSetting";

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
  thetaLengthUnit: 0.06
};

const CylinderPrimitive = observer((props: PrimitiveProps) => {
  const ref = useRef();
  const { primitiveStore } = storeContainer;
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
  material.transparent = true;
  const mesh = props.propMesh ?? new THREE.Mesh(geometry, material);
  mesh.name = "CYLINDER";
  mesh.userData["storeId"] = props.storeId;
  mesh.userData["isLocked"] = false;

  useEffect(() => {
    primitiveStore.updatePrimitive(mesh.userData["storeId"], mesh);
    canvasHistoryStore.differAdd(mesh.userData["storeId"]);
  }, []);

  return (
    <>
      <primitive
        ref={ref}
        object={primitiveStore.meshes[props.storeId] ?? mesh}
      />
    </>
  );
});

export type { CylinderParams };
export { initCylinder };
export default CylinderPrimitive;
