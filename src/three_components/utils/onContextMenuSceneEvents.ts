import { MouseEvent } from 'react';
import * as THREE from 'three';
import storeContainer from '@/store/storeContainer';
import { findRootAsset, hasAsset } from './findAsset';
import { findRootGroup } from './findGroup';

const onContextMenuSceneEvents = (
  intersectObjects: THREE.Intersection<THREE.Object3D<THREE.Event>>[]
) => {
  const {
    primitiveStore,
    mouseEventStore,
    contextMenuStore,
    keyboardEventStore
  } = storeContainer;

  const { clientX, clientY } = mouseEventStore
    .currentMouseEvent[1] as MouseEvent;
  mouseEventStore.clearMouseEvent();

  if (!keyboardEventStore.currentKeyEvent.isCtrlPressed) {
    // 단일 선택
    primitiveStore.clearSelectedPrimitives();
  }

  const selectObject = intersectObjects.find((value) => {
    return primitiveStore.meshes[value.object.userData['storeId']];
  });

  // 그룹 애셋 찾기
  const selectChildObject = intersectObjects.find(
    (value) =>
      value.object.parent?.name === 'GROUP' ||
      hasAsset(value.object, value.object)
  )?.object;

  const selectRootObject = findRootGroup(selectChildObject);

  if (selectRootObject) {
    const selectGroupObjectStoreId = selectRootObject.userData['storeId'];
    primitiveStore.addSelectedPrimitives(
      selectGroupObjectStoreId,
      primitiveStore.meshes[selectGroupObjectStoreId]
    );

    contextMenuStore.updateContextMenuType('OBJECT', clientX, clientY);
    contextMenuStore.updateIsContextMenuOpened(true);
    return;
  }

  if (selectChildObject && !selectRootObject) {
    const assetRoot = findRootAsset(selectChildObject);
    const assetRootStoreId = assetRoot?.userData['storeId'];

    primitiveStore.addSelectedPrimitives(
      assetRootStoreId,
      primitiveStore.meshes[assetRootStoreId]
    );

    contextMenuStore.updateContextMenuType('OBJECT', clientX, clientY);
    contextMenuStore.updateIsContextMenuOpened(true);
    return;
  }

  if (!selectObject) {
    primitiveStore.clearSelectedPrimitives();
    primitiveStore.clearSelectedGroupPrimitive();
    contextMenuStore.updateContextMenuType('CANVAS', clientX, clientY);
    contextMenuStore.updateIsContextMenuOpened(true);
    return;
  }

  const selectObjectStoreId = selectObject.object.userData['storeId'];

  primitiveStore.addSelectedPrimitives(
    selectObjectStoreId,
    primitiveStore.meshes[selectObjectStoreId]
  );

  contextMenuStore.updateContextMenuType('OBJECT', clientX, clientY);
  contextMenuStore.updateIsContextMenuOpened(true);
};

export default onContextMenuSceneEvents;
