import storeContainer from "@/store/storeContainer";
import { observer } from "mobx-react";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import getCenterPoint from "../utils/getCenterPoint";
import { useThree } from "@react-three/fiber";

interface GroupProps {
  storeId: string;
}

const Group = observer((props: GroupProps) => {
  const ref = useRef();
  const { primitiveStore } = storeContainer;
  const scene = useThree((state) => state.scene);

  const geometry = new THREE.BufferGeometry();
  const material = new THREE.MeshPhysicalMaterial({
    transparent: true,
  });
  const mesh = new THREE.Mesh(geometry, material);

  mesh.name = "GROUP";
  mesh.userData["storeId"] = props.storeId;

  useEffect(() => {
    //selected 추가
    if (!primitiveStore.meshes[props.storeId]) {
      const selectedPrimitives = Object.values(
        primitiveStore.selectedPrimitives
      );

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
        mesh.attach(value);
        primitiveStore.removePrimitive(value.userData["storeId"]);
      });

      primitiveStore.updatePrimitive(props.storeId, mesh);

      primitiveStore.clearSelectedPrimitives();
      primitiveStore.clearSelectedGroupPrimitive();
    }
  }, []);

  useEffect(() => {
    if (primitiveStore.meshes[props.storeId]?.children.length === 1) {
      // 자식이 하나이니 그룹 해제
      const child = primitiveStore.meshes[props.storeId]?.children[0];
      primitiveStore.updatePrimitive(
        child.userData["storeId"],
        child as THREE.Mesh
      );

      scene.attach(child);

      primitiveStore.removePrimitive(props.storeId);
    } else {
      // 포지션 재조정
    }
  }, [primitiveStore.meshes[props.storeId]?.children.length]);

  return (
    <>
      <primitive
        ref={ref}
        object={primitiveStore.meshes[props.storeId] ?? mesh}
      />
    </>
  );
});

export default Group;
