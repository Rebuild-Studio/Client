import { useEffect, useRef } from "react";
import * as THREE from "three";
import { observer } from "mobx-react";
import canvasHistoryStore from "@store/canvasHistoryStore";
import storeContainer from "@store/storeContainer";
import getCenterPoint from "../utils/getCenterPoint";

interface GroupProps {
  storeId: string;
  propMesh?: THREE.Mesh;
}

const Group = observer((props: GroupProps) => {
  const ref = useRef();
  const { primitiveStore } = storeContainer;

  const geometry = new THREE.BufferGeometry();
  const material = new THREE.MeshPhysicalMaterial({
    transparent: true,
  });
  const mesh = props.propMesh ?? new THREE.Mesh(geometry, material);
  mesh.name = "GROUP";
  mesh.userData["storeId"] = props.storeId;

  useEffect(() => {
    //selected 추가

    if (props.propMesh) {
      // 이미 그룹 작업이 되어있으므로 업데이트만
      primitiveStore.updatePrimitive(props.storeId, mesh);
      return;
    }

    if (!primitiveStore.meshes[props.storeId]) {
      const selectedPrimitives = Object.values(
        primitiveStore.selectedPrimitives,
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
        if (!primitiveStore.meshes[value.userData["storeId"]]) {
          value.userData["isLeave"] = true;
        }
        mesh.attach(value);
        primitiveStore.removePrimitive(value.userData["storeId"]);
      });

      primitiveStore.updatePrimitive(props.storeId, mesh);

      primitiveStore.clearSelectedPrimitives();
      primitiveStore.clearSelectedGroupPrimitive();
      canvasHistoryStore.differAdd(mesh.userData["storeId"]);
    }
  }, []);

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
