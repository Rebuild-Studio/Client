import storeContainer from "@/store/storeContainer";
import * as THREE from "three";

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

const findParentGroup = (
  intersectObject: THREE.Object3D<THREE.Event> | undefined
): THREE.Object3D<THREE.Event> | undefined => {
  if (!intersectObject) {
    return;
  }

  return intersectObject.parent ?? undefined;
};

const isChildInGroup = (
  parentObject: THREE.Object3D<THREE.Event>,
  childId: string
): boolean => {
  let res = false;
  parentObject.traverse((child) => {
    if (child.userData["storeId"] === childId) {
      res = true;
    }
  });

  return res;
};

const hasChildGroup = (
  intersectObject: THREE.Object3D<THREE.Event>
): boolean => {
  let res = false;
  intersectObject.traverse((child) => {
    if (
      intersectObject.userData["storeId"] !== child.userData["storeId"] &&
      child.name === "GROUP"
    ) {
      res = true;
    }
  });
  return res;
};

const getParent = (
  rootId: string,
  parentId: string
): THREE.Object3D<THREE.Event> | null => {
  const { primitiveStore } = storeContainer;
  let res: THREE.Object3D<THREE.Event> | null = null;

  const rootObject = Object.values(primitiveStore.meshes).find((value) => {
    return value.userData["storeId"] === rootId;
  });

  rootObject?.traverse((child) => {
    if (child.userData["storeId"] === parentId) {
      res = child;
    }
  });

  return res;
};
export {
  findRootGroup,
  findParentGroup,
  isChildInGroup,
  hasChildGroup,
  getParent,
};
