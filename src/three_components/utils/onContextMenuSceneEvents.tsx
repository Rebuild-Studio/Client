import storeContainer from "@/store/storeContainer";
import * as THREE from "three";

const onContextMenuSceneEvents = (
  intersectObjects: THREE.Intersection<THREE.Object3D<THREE.Event>>[]
) => {
  const {
    primitiveStore,
    mouseEventStore,
    contextMenuStore,
    keyboardEventStore,
  } = storeContainer;

  const { clientX, clientY } = mouseEventStore.currentMouseEvent[1]!;
  mouseEventStore.clearMouseEvent();

  if (
    !keyboardEventStore.currentKeyEvent.isCtrlPressed &&
    primitiveStore.selectedGroupPrimitive[0] === ""
  ) {
    // 단일 선택
    primitiveStore.clearSelectedPrimitives();
  }

  const selectObject = intersectObjects.find((value) => {
    return primitiveStore.primitives[value.object.userData["storeId"]];
  });

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

export default onContextMenuSceneEvents;
