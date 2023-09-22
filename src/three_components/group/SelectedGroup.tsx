import storeContainer from "@/store/storeContainer";
import { observer } from "mobx-react";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import GroupGizmo from "../gizmo/GroupGizmo";
import getCenterPoint from "../utils/getCenterPoint";
import { useThree } from "@react-three/fiber";

interface SelectedGroupProps {
  storeId: string;
}

const SelectedGroup = observer((props: SelectedGroupProps) => {
  const ref = useRef();
  const { primitiveStore } = storeContainer;
  const scene = useThree((state) => state.scene);
  const childrenStoreIds: Array<string> = [];

  const geometry = new THREE.BufferGeometry();
  const material = new THREE.MeshPhysicalMaterial({
    transparent: true,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = "SELECTED_GROUP";
  mesh.userData["storeId"] = props.storeId;

  useEffect(() => {
    // selected 추가
    const selectedPrimitives = Object.values(primitiveStore.selectedPrimitives);

    let x = 0;
    let y = 0;
    let z = 0;

    selectedPrimitives.forEach((value) => {
      x += value.getWorldPosition(new THREE.Vector3()).x;
      y += value.getWorldPosition(new THREE.Vector3()).y;
      z += value.getWorldPosition(new THREE.Vector3()).z;
    });

    mesh.position.set(...getCenterPoint(x, y, z, selectedPrimitives.length));

    selectedPrimitives.forEach((value) => {
      childrenStoreIds.push(value.userData["storeId"]);
      mesh.attach(value);
    });

    primitiveStore.updatePrimitive(props.storeId, mesh);

    return () => {
      try {
        childrenStoreIds.forEach((storeId) => {
          scene.attach(primitiveStore.meshes[storeId]);
        });
      } catch (e) {}

      primitiveStore.removePrimitive(props.storeId);
    };
  }, []);

  return (
    <>
      <GroupGizmo storeId={props.storeId} />
      <primitive
        ref={ref}
        object={primitiveStore.meshes[props.storeId] ?? mesh}
      />
    </>
  );
});

export default SelectedGroup;
