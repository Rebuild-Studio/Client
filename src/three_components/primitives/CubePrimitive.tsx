import { useEffect, useRef } from "react";
import * as THREE from "three";
import { getDefaultMaterialSetting } from "../utils/materialSetting";
import { observer } from "mobx-react";
import storeContainer from "@/store/storeContainer";
import { PrimitiveProps } from "../common/PrimitiveProps";
import Gizmo from "../gizmo/Gizmo";

const CubePrimitive = observer((props: PrimitiveProps) => {
  const ref = useRef();
  const { primitiveStore } = storeContainer;
  const geometry = new THREE.BoxGeometry();
  const material = getDefaultMaterialSetting();
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = "CUBE";
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

export default CubePrimitive;
