const hasAsset = (
  intersectObject: THREE.Object3D<THREE.Event> | undefined,
  original: THREE.Object3D<THREE.Event> | undefined
): THREE.Object3D<THREE.Event> | undefined => {
  if (!intersectObject) {
    return;
  }

  if (intersectObject.parent?.name === 'ASSET') {
    return original;
  }

  return hasAsset(intersectObject.parent ?? undefined, original);
};

const findRootAsset = (
  intersectObject: THREE.Object3D<THREE.Event> | undefined
): THREE.Object3D<THREE.Event> | undefined => {
  if (!intersectObject) {
    return;
  }

  if (
    intersectObject.parent?.type === 'Scene' &&
    intersectObject.name === 'ASSET'
  ) {
    return intersectObject;
  }

  return findRootAsset(intersectObject.parent ?? undefined);
};
export { hasAsset, findRootAsset };
