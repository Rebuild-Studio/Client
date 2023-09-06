import { useEffect, useRef } from "react";
import * as THREE from "three";
import { getDefaultMaterialSetting } from "../utils/materialSetting";
import { observer } from "mobx-react";
import storeContainer from "@/store/storeContainer";
import { PrimitiveProps } from "../common/PrimitiveProps";

const CubePrimitive = observer((props: PrimitiveProps) => {
  const ref = useRef();
  const { primitiveStore } = storeContainer;
  const geometry = new THREE.BoxGeometry();
  const material = getDefaultMaterialSetting();
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = "CUBE";
  mesh.userData["nnid"] = props.nnid;

  useEffect(() => {
    primitiveStore.updatePrimitive(mesh.userData["nnid"], mesh);
  }, []);

  return (
    <primitive
      ref={ref}
      object={
        primitiveStore.meshes[mesh.userData["nnid"]]
          ? primitiveStore.meshes[mesh.userData["nnid"]]
          : mesh
      }
    />
  );
});

export default CubePrimitive;
