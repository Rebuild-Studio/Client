import storeContainer from "@/store/storeContainer";
import * as THREE from "three";
import { findRootGroup, hasChildGroup, isChildInGroup } from "./findGroup";
import {
  selectChildGroupInGroup,
  selectChildObjectInGroup,
} from "./selectInGroup";

const onClickSceneEvents = (
  intersectObjects: THREE.Intersection<THREE.Object3D<THREE.Event>>[]
) => {
  const { primitiveStore, mouseEventStore, keyboardEventStore } =
    storeContainer;

  const currentSelectObjects = Object.values(
    primitiveStore.selectedPrimitives
  ).map((value) => {
    return value;
  });

  mouseEventStore.clearMouseEvent();

  // 단일 선택
  if (
    !keyboardEventStore.currentKeyEvent.isCtrlPressed &&
    primitiveStore.selectedGroupPrimitive[0] === ""
  ) {
    primitiveStore.clearSelectedPrimitives();
  }

  const selectObject = intersectObjects.find((value) => {
    return primitiveStore.meshes[value.object.userData["storeId"]];
  });

  console.log(intersectObjects);

  // 그룹 찾기
  const selectChildObject = intersectObjects.find((value) => {
    return value.object.parent?.name === "GROUP";
  })?.object;

  const selectRootObject = findRootGroup(selectChildObject);

  if (selectRootObject) {
    const selectRootObjectStoreId: string =
      selectRootObject.userData["storeId"];

    if (currentSelectObjects && currentSelectObjects.length === 1) {
      const selectedObject = currentSelectObjects[0];
      const selectedObjectStoreId: string = selectedObject.userData["storeId"];

      if (
        selectedObjectStoreId !== selectRootObjectStoreId &&
        isChildInGroup(selectedObject, selectChildObject?.userData["storeId"])
      ) {
        selectChildObjectInGroup(selectRootObjectStoreId, selectChildObject!);
        return;
      }

      if (selectedObjectStoreId === selectRootObjectStoreId) {
        if (
          selectChildObject?.parent?.userData["storeId"] ===
          selectRootObjectStoreId
        ) {
          selectChildObjectInGroup(selectRootObjectStoreId, selectChildObject!);
          return;
        }

        if (hasChildGroup(selectRootObject)) {
          selectChildGroupInGroup(selectRootObjectStoreId, selectChildObject!);
          return;
        } else {
          selectChildObjectInGroup(selectRootObjectStoreId, selectChildObject!);
          return;
        }
      }
    }

    primitiveStore.addSelectedPrimitives(
      selectRootObjectStoreId,
      primitiveStore.meshes[selectRootObjectStoreId]
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

export default onClickSceneEvents;
