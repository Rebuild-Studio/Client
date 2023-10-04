import storeContainer from "@/store/storeContainer";
import * as THREE from "three";
import {
  findParentGroup,
  findRootGroup,
  hasChildGroup,
  isChildInGroup,
} from "./findGroup";

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

  // 그룹 찾기
  const selectChildObject = intersectObjects.find((value) => {
    return value.object.parent?.name === "GROUP";
  })?.object;

  const selectRootObject = findRootGroup(selectChildObject);

  console.log(intersectObjects, selectChildObject, selectRootObject);

  if (selectRootObject) {
    const selectRootObjectStoreId = selectRootObject.userData["storeId"];

    // 현재 선택된 그룹의 자식 선택
    if (
      currentSelectObjects &&
      currentSelectObjects.length === 1 &&
      currentSelectObjects[0].userData["storeId"] !== selectRootObjectStoreId &&
      isChildInGroup(
        currentSelectObjects[0],
        selectChildObject?.userData["storeId"]
      )
    ) {
      selectChildObject!.userData["parentId"] =
        selectChildObject!.parent?.userData["storeId"];
      selectChildObject!.userData["rootId"] = selectRootObjectStoreId;

      primitiveStore.addSelectedPrimitives(
        selectChildObject?.userData["storeId"],
        selectChildObject as THREE.Mesh
      );

      return;
    }

    if (
      currentSelectObjects &&
      currentSelectObjects.length === 1 &&
      currentSelectObjects[0].userData["storeId"] === selectRootObjectStoreId
    ) {
      if (
        selectChildObject?.parent?.userData["storeId"] ===
        selectRootObjectStoreId
      ) {
        // 자식 object 선택
        selectChildObject!.userData["parentId"] =
          selectChildObject!.parent?.userData["storeId"];
        selectChildObject!.userData["rootId"] = selectRootObjectStoreId;

        primitiveStore.addSelectedPrimitives(
          selectChildObject?.userData["storeId"],
          selectChildObject as THREE.Mesh
        );

        return;
      }

      if (hasChildGroup(selectRootObject)) {
        // 자식 group 선택
        const group = findParentGroup(selectChildObject);
        group!.userData["parentId"] = group!.parent?.userData["storeId"];
        group!.userData["rootId"] = selectRootObjectStoreId;

        primitiveStore.addSelectedPrimitives(
          group?.userData["storeId"],
          group as THREE.Mesh
        );
      } else {
        // 자식 object 선택
        selectChildObject!.userData["parentId"] =
          selectChildObject!.parent?.userData["storeId"];
        selectChildObject!.userData["rootId"] = selectRootObjectStoreId;

        primitiveStore.addSelectedPrimitives(
          selectChildObject?.userData["storeId"],
          selectChildObject as THREE.Mesh
        );
      }

      return;
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
