import { useEffect, useRef } from "react";
import * as THREE from "three";
import { observer } from "mobx-react";
import storeContainer from "@store/storeContainer";

interface AssetPrimitveProps {
  mesh: THREE.Mesh;
}

const AssetPrimitive = observer((props: AssetPrimitveProps) => {
  const ref = useRef();
  const { primitiveStore } = storeContainer;

  useEffect(() => {
    primitiveStore.updatePrimitive(props.mesh.userData["storeId"], props.mesh);
  }, []);

  return (
    <primitive
      ref={ref}
      object={primitiveStore.meshes[props.mesh.userData["storeId"]]}
    />
  );
});

export default AssetPrimitive;
