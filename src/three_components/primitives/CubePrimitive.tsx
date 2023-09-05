import { useEffect, useId, useRef } from "react";
import * as THREE from "three";
import { getDefaultMaterialSetting } from "../common/materialSetting";
import { observer } from "mobx-react";
import primitiveStore from "@/store/primitiveStore";

const CubePrimitive = observer(() => {
  const ref = useRef();
  const uuid = useId();
  const store = primitiveStore;
  const geometry = new THREE.BoxGeometry();
  const material = getDefaultMaterialSetting();
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = "CUBE";
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
});

export default CubePrimitive;
