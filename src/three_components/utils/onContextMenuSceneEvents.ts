import storeContainer from "@/store/storeContainer";
import { MouseEvent } from "react";
import * as THREE from "three";
import { hasAsset } from "./findAsset";

const onContextMenuSceneEvents = (
  intersectObjects: THREE.Intersection<THREE.Object3D<THREE.Event>>[]
) => {
  const {
    primitiveStore,
    mouseEventStore,
    contextMenuStore,
    keyboardEventStore,
  } = storeContainer;

  const { clientX, clientY } = mouseEventStore.currentMouseEvent[1] as MouseEvent;
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

  // 그룹 애셋 찾기
  const selectGroupObject = findRootGroup(
    intersectObjects.find((value) => {
      return (
        value.object.parent?.name === "GROUP" ||
        hasAsset(value.object, value.object)
      );
    })?.object
  );

  if (selectGroupObject) {
    const selectGroupObjectStoreId = selectGroupObject.userData["storeId"];
    primitiveStore.addSelectedPrimitives(
      selectGroupObjectStoreId,
      primitiveStore.meshes[selectGroupObjectStoreId]
    );

    contextMenuStore.updateContextMenuType("OBJECT", clientX, clientY);
    contextMenuStore.updateIsContextMenuOpened(true);
    return;
  }

  if (!selectObject) {
    primitiveStore.clearSelectedPrimitives();
    primitiveStore.clearSelectedGroupPrimitive();
    contextMenuStore.updateContextMenuType("CANVAS", clientX, clientY);
    contextMenuStore.updateIsContextMenuOpened(true);
    return;
  }

  const selectObjectStoreId = selectObject.object.userData["storeId"];

  primitiveStore.addSelectedPrimitives(
    selectObjectStoreId,
    primitiveStore.meshes[selectObjectStoreId]
  );

  contextMenuStore.updateContextMenuType("OBJECT", clientX, clientY);
  contextMenuStore.updateIsContextMenuOpened(true);
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

export default onContextMenuSceneEvents;
