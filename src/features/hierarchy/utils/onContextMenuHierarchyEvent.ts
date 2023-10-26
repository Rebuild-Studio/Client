import storeContainer from '@/store/storeContainer';
import * as THREE from 'three';
import onClickHierarchyEvent from './onClickHierarchyEvent';
import { findRootAsset } from '@/three_components/utils/findAsset';
import { findRootGroup } from '@/three_components/utils/findGroup';

const onContextMenuHierarchyEvents = (
  clientX: number,
  clientY: number,
  mesh: THREE.Mesh
) => {
  const { contextMenuStore } = storeContainer;

  const rootObject = findRootGroup(mesh) || findRootAsset(mesh);

  onClickHierarchyEvent((rootObject as THREE.Mesh) ?? mesh);

  contextMenuStore.updateContextMenuType('OBJECT', clientX, clientY);
  contextMenuStore.updateIsContextMenuOpened(true);
};

export default onContextMenuHierarchyEvents;
