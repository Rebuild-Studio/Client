import storeContainer from "@/store/storeContainer";
import { observer } from "mobx-react";
import { useEffect, useRef } from "react";
import * as THREE from "three";

interface AssetPrimitveProps {
  mesh: THREE.Mesh;
}

const AssetPrimitive = observer((props: AssetPrimitveProps) => {
  const ref = useRef();
  const { primitiveStore } = storeContainer;

  useEffect(() => {
    primitiveStore.updatePrimitive(props.mesh.userData["storeID"], props.mesh);
  }, []);

  return (
    <primitive
      ref={ref}
      object={primitiveStore.meshes[props.mesh.userData["storeID"]]}
    />
  );
});

export default AssetPrimitive;
