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
  mesh.userData["storeID"] = props.storeID;

  useEffect(() => {
    primitiveStore.updatePrimitive(mesh.userData["storeID"], mesh);
  }, []);

  return (
    <>
      <Gizmo storeID={props.storeID} />
      <primitive
        ref={ref}
        object={
          primitiveStore.meshes[props.storeID]
            ? primitiveStore.meshes[props.storeID]
            : mesh
        }
      />
    </>
  );
});

export default CubePrimitive;
