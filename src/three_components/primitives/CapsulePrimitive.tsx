import primitiveStore from "@/store/primitiveStore";
import { useRef, useId, useEffect } from "react";
import THREE from "three";
import { getDefaultMaterialSetting } from "../common/materialSetting";

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
  radialSegments: 1,
};

const CapsulePrimitive = () => {
  const ref = useRef();
  const uuid = useId();
  const store = primitiveStore;
  const geometry = new THREE.CapsuleGeometry(0.25, 1, 10, 20);
  const material = getDefaultMaterialSetting();
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = "CAPSULE";
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

export type { CapsuleParams };
export { initCapsule };
export default CapsulePrimitive;
