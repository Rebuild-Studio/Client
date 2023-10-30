import storeContainer from '@/store/storeContainer';
import { findParentGroup } from './findGroup';

const selectChildObjectInGroup = (
  rootObjectStoreId: string,
  childObject: THREE.Object3D<THREE.Event>
) => {
  const { primitiveStore } = storeContainer;
  childObject!.userData['parentId'] = childObject!.parent?.userData['storeId'];
  childObject!.userData['rootId'] = rootObjectStoreId;

  primitiveStore.addSelectedPrimitives(
    childObject?.userData['storeId'],
    childObject as THREE.Mesh
  );
};

const selectChildGroupInGroup = (
  rootObjectStoreId: string,
  childObject: THREE.Object3D<THREE.Event>
) => {
  const { primitiveStore } = storeContainer;
  const group = findParentGroup(childObject);
  group!.userData['parentId'] = group!.parent?.userData['storeId'];
  group!.userData['rootId'] = rootObjectStoreId;

  primitiveStore.addSelectedPrimitives(
    group?.userData['storeId'],
    group as THREE.Mesh
  );
};

export { selectChildObjectInGroup, selectChildGroupInGroup };
