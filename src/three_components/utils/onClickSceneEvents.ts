import storeContainer from "@/store/storeContainer";
import * as THREE from "three";

const onClickSceneEvents = (
  intersectObjects: THREE.Intersection<THREE.Object3D<THREE.Event>>[]
) => {
  const { primitiveStore, mouseEventStore } = storeContainer;

  mouseEventStore.clearMouseEvent();
  // 차후 그룹들어 가면 로직 추가되어야 함
  primitiveStore.clearSelectedPrimitives();

  const selectObject = intersectObjects.find((value) => {
    return primitiveStore.primitives[value.object.userData["storeId"]];
  });

  if (!selectObject) {
    return;
  }

  const selectObjectStoreId = selectObject.object.userData["storeId"];

  primitiveStore.addSelectedPrimitives(
    selectObjectStoreId,
    primitiveStore.meshes[selectObjectStoreId]
  );
};

export default onClickSceneEvents;
