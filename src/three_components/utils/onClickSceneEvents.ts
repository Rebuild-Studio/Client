import storeContainer from "@/store/storeContainer";
import * as THREE from "three";

const onClickSceneEvents = (
  intersectObjects: THREE.Intersection<THREE.Object3D<THREE.Event>>[]
) => {
  const { primitiveStore, mouseEventStore, keyboardEventStore } =
    storeContainer;

  mouseEventStore.clearMouseEvent();

  if (
    !keyboardEventStore.currentKeyEvent.isCtrlPressed &&
    primitiveStore.selectedGroupPrimitive[0] === ""
  ) {
    // 단일 선택
    primitiveStore.clearSelectedPrimitives();
  }

  const selectObject = intersectObjects.find((value) => {
    return primitiveStore.meshes[value.object.userData["storeId"]];
  });

  // 그룹 찾기
  const selectGroupObject = findRootGroup(
    intersectObjects.find((value) => {
      return value.object.parent?.name === "GROUP";
    })?.object
  );

  if (selectGroupObject) {
    const selectGroupObjectStoreId = selectGroupObject.userData["storeId"];

    // 이미 선택한 경우 children 찾아가기
    if (primitiveStore.selectedGroupPrimitive[selectGroupObjectStoreId]) {
    }

    primitiveStore.addSelectedPrimitives(
      selectGroupObjectStoreId,
      primitiveStore.meshes[selectGroupObjectStoreId]
    );
    return;
  }

  if (!selectObject) {
    primitiveStore.clearSelectedPrimitives();
    primitiveStore.clearSelectedGroupPrimitive();
    return;
  }

  const selectObjectStoreId = selectObject.object.userData["storeId"];

  primitiveStore.addSelectedPrimitives(
    selectObjectStoreId,
    primitiveStore.meshes[selectObjectStoreId]
  );
};

const findRootGroup = (
  intersectObject: THREE.Object3D<THREE.Event> | undefined
): THREE.Object3D<THREE.Event> | undefined => {
  if (!intersectObject) {
    return;
  }

  if (intersectObject.parent?.type === "Scene") {
    return intersectObject;
  }

  return findRootGroup(intersectObject.parent ?? undefined);
};

export default onClickSceneEvents;
