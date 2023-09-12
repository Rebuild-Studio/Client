import { useEffect, useRef } from "react";
import * as THREE from "three";
import { getDefaultMaterialSetting } from "../utils/materialSetting";
import { observer } from "mobx-react";
import storeContainer from "@/store/storeContainer";
import { PrimitiveProps } from "../common/PrimitiveProps";
import Gizmo from "../gizmo/Gizmo";

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

const ConePrimitive = observer((props: PrimitiveProps) => {
  const ref = useRef();
  const { primitiveStore } = storeContainer;
  const geometry = new THREE.ConeGeometry(0.5, 1, 32, 1, false, 0, Math.PI * 2);
  const material = getDefaultMaterialSetting();
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = "CONE";
  mesh.userData["storeId"] = props.storeId;

  useEffect(() => {
    primitiveStore.updatePrimitive(mesh.userData["storeId"], mesh);
  }, []);

  return (
    <>
      {Object.keys(primitiveStore.selectedPrimitives).length > 1 ? (
        ""
      ) : (
        <Gizmo storeId={props.storeId} />
      )}
      <primitive
        ref={ref}
        object={primitiveStore.meshes[props.storeId] ?? mesh}
      />
    </>
  );
});

export type { ConeParams };
export { initCone };
export default ConePrimitive;
