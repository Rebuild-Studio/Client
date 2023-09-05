import storeContainer from "@/store/storeContainer";
import { observer } from "mobx-react";
import { useEffect, useId, useRef } from "react";
import * as THREE from "three";

const AssetPrimitive = observer((mesh: THREE.Mesh) => {
  const ref = useRef();
  const uuid = useId();
  const { primitiveStore } = storeContainer;
  mesh.name = "ASSET";
  mesh.uuid = uuid;

  useEffect(() => {
    primitiveStore.updatePrimitive(mesh.uuid, mesh);
  }, []);

  return (
    <primitive
      ref={ref}
      object={
        primitiveStore.meshes[mesh.uuid]
          ? primitiveStore.meshes[mesh.uuid]
          : mesh
      }
    />
  );
});

export default AssetPrimitive;
