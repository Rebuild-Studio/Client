import storeContainer from "@/store/storeContainer";
import { observer } from "mobx-react";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import GroupGizmo from "../gizmo/GroupGizmo";
import getCenterPoint from "../utils/getCenterPoint";
import { useThree } from "@react-three/fiber";
import { getParent } from "../utils/findGroup";

interface SelectedGroupProps {
  storeId: string;
}

const SelectedGroup = observer((props: SelectedGroupProps) => {
  const ref = useRef();
  const { primitiveStore } = storeContainer;
  const scene = useThree((state) => state.scene);
  const childrenMeshes: Array<THREE.Mesh> = [];

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
      childrenMeshes.push(value);
      mesh.attach(value);
    });

    primitiveStore.updatePrimitive(props.storeId, mesh);

    return () => {
      try {
        childrenMeshes.forEach((child) => {
          // meshes에 있는 지 확인
          if (primitiveStore.meshes[child.userData["storeId"]]) {
            scene.attach(child);
          } else {
            const rootId = child.userData["rootId"];
            const parentId = child.userData["parentId"];
            const parent = getParent(rootId, parentId);

            delete child.userData["rootId"];
            delete child.userData["parentId"];

            parent?.attach(child);
          }
        });
      } catch (e) {
        console.log(e);
      }

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
