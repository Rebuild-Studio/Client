import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { useServerMaterialLoader } from "../hooks/loader";
import storeContainer from "@/store/storeContainer";
import * as THREE from "three";

export const MaterialLoader = observer((props: any) => {
  const [newMesh, setNewMesh] = useState(new THREE.Mesh());
  const { primitiveStore } = storeContainer;
  const { name } = props;
  const material = useServerMaterialLoader(name);
  const keys = Object.keys(primitiveStore.selectedPrimitives);

  useEffect(() => {
    if (
      primitiveStore.selectedPrimitives[keys[0]] &&
      primitiveStore.selectedMaterial
    ) {
      setNewMesh(primitiveStore.selectedPrimitives[keys[0]]);
      newMesh.material = material;
      primitiveStore.updateSelectedPrimitives(keys[0], newMesh);
    }
  }, [primitiveStore.selectedMaterial]);
  return <></>;
});
