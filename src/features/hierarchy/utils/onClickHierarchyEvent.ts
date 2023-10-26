import storeContainer from '@/store/storeContainer';
import { nanoid } from 'nanoid';
import * as THREE from 'three';

const onClickHierarchyEvent = (mesh: THREE.Mesh) => {
  const { primitiveStore, keyboardEventStore } = storeContainer;

  const storeId: string = mesh.userData['storeId'] || nanoid();

  // 단일 선택
  if (!keyboardEventStore.currentKeyEvent.isCtrlPressed) {
    primitiveStore.clearSelectedPrimitives();
  }

  primitiveStore.addSelectedPrimitives(storeId, mesh);
};

export default onClickHierarchyEvent;
