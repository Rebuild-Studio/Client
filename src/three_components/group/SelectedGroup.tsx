import storeContainer from "@/store/storeContainer";
import { observer } from "mobx-react";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import GroupGizmo from "../gizmo/GroupGizmo";
import getCenterPoint from "../utils/getCenterPoint";
import { useFrame } from "@react-three/fiber";

interface SelectedGroupProps {
  storeId: string;
}

const SelectedGroup = observer((props: SelectedGroupProps) => {
  const ref = useRef();
  const { primitiveStore } = storeContainer;

  useFrame((state, delta) => {
    // 선택 컴포넌트 복원 작업
    if (Object.keys(primitiveStore.selectedPrimitives).length === 0) {
      Object.values(primitiveStore.tempPrimitives).forEach((storeId) => {
        state.scene.attach(primitiveStore.meshes[storeId]);
      });
      primitiveStore.clearTempPrimitives();
    }
  });

  const getOnSelectedGroupPosition = () => {
    let totalX = 0;
    let totalY = 0;
    let totalZ = 0;

    Object.values(primitiveStore.selectedPrimitives).forEach((value) => {
      totalX += value.position.x;
      totalY += value.position.y;
      totalZ += value.position.z;
    });

    return getCenterPoint(
      totalX,
      totalY,
      totalZ,
      Object.keys(primitiveStore.selectedPrimitives).length
    );
  };

  const geometry = new THREE.BufferGeometry();
  const material = new THREE.MeshPhysicalMaterial({
    transparent: true,
  });
  const mesh = new THREE.Mesh(geometry, material);
  const [x, y, z] = getOnSelectedGroupPosition();
  mesh.name = "SELECTED_GROUP";
  mesh.userData["storeId"] = props.storeId;
  mesh.position.set(x, y, z);

  useEffect(() => {
    // selected 추가
    Object.values(primitiveStore.selectedPrimitives).forEach((value) => {
      mesh.attach(value);
    });

    primitiveStore.updatePrimitive(props.storeId, mesh);
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
