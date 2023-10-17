import { useEffect, useRef } from "react";
import * as THREE from "three";
import { observer } from "mobx-react";
import canvasHistoryStore from "@store/canvasHistoryStore";
import storeContainer from "@store/storeContainer";
import { PrimitiveProps } from "../common/PrimitiveProps";
import { getDefaultMaterialSetting } from "../utils/materialSetting";

const CubePrimitive = observer((props: PrimitiveProps) => {
  const ref = useRef();
  const { primitiveStore } = storeContainer;
  const geometry = new THREE.BoxGeometry();
  const material = getDefaultMaterialSetting();
  material.transparent = true;
  const mesh = props.propMesh ?? new THREE.Mesh(geometry, material);
  mesh.name = "CUBE";
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

export default CubePrimitive;
