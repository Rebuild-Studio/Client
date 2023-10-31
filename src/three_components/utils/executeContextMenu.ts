import * as THREE from 'three';
import { nanoid } from 'nanoid';
import storeContainer from '@/store/storeContainer';
import canvasHistoryStore from '@store/canvasHistory.store.ts';
import { MeshType } from '@store/primitive.store.ts';
import { copyGroup, copyObject } from './copyObject';
import {
  renderAsset,
  renderGroup,
  renderPointLight,
  renderPrimitive,
  renderSpotLight
} from './renderThreeComponents';

const executeContextMenu = (scene: THREE.Scene) => {
  const {
    projectStateStore,
    primitiveStore,
    contextMenuStore,
    sceneSettingStore
  } = storeContainer;

  // 잠금된 오브젝트 있는지 확인
  const isLocked = Object.values(primitiveStore.selectedPrimitives).find(
    (value) => {
      return value.userData['isLocked'] === true;
    }
  );

  // 잠금 해제 이벤트 말고는 전부 막기
  if (isLocked && contextMenuStore.currentSelectedContextMenu !== '잠금 해제') {
    return;
  }

  switch (contextMenuStore.currentSelectedContextMenu) {
    case '미리보기':
      break;
    case '그리드 숨기기':
      sceneSettingStore.setIsGridVisible(false);
      sceneSettingStore.setIsAxisVisible(false);
      break;
    case '그리드 표시':
      sceneSettingStore.setIsGridVisible(true);
      sceneSettingStore.setIsAxisVisible(true);
      break;
    case '저장':
      break;
    case '붙여넣기':
      Object.values(projectStateStore.currentCopyPrimitive).forEach((value) => {
        switch (value.name) {
          case 'POINT_LIGHT': {
            const { storeId, newGroup } = copyGroup(value);
            primitiveStore.addPrimitive(
              storeId,
              renderPointLight(storeId, newGroup)
            );
            break;
          }
          case 'SPOT_LIGHT': {
            const { storeId, newGroup } = copyGroup(value);
            primitiveStore.addPrimitive(
              storeId,
              renderSpotLight(storeId, newGroup)
            );
            break;
          }
          case 'ASSET': {
            const { storeId, newGroup } = copyGroup(value);
            primitiveStore.addPrimitive(
              storeId,
              renderAsset(storeId, newGroup)
            );
            break;
          }
          case 'GROUP': {
            const { storeId, newGroup } = copyGroup(value);
            primitiveStore.addPrimitive(
              storeId,
              renderGroup(storeId, newGroup)
            );
            break;
          }
          default: {
            const { storeId, newMesh } = copyObject(value);
            primitiveStore.addPrimitive(
              storeId,
              renderPrimitive(storeId, newMesh)
            );
          }
        }
      });
      break;
    case '복사':
      const copyMeshes: MeshType = {};

      Object.values(primitiveStore.selectedPrimitives).forEach((value) => {
        switch (value.name) {
          case 'POINT_LIGHT':
          case 'SPOT_LIGHT':
          case 'ASSET':
          case 'GROUP': {
            const { storeId, newGroup } = copyGroup(value);
            copyMeshes[storeId] = newGroup;
            break;
          }
          default: {
            const { storeId, newMesh } = copyObject(value);
            copyMeshes[storeId] = newMesh;
          }
        }
      });

      projectStateStore.updateCurrentCopyPrimitive(copyMeshes);
      break;
    case '그룹':
      const storeId = nanoid();
      primitiveStore.addPrimitive(storeId, renderGroup(storeId));
      break;
    case '그룹 해제':
      const selectedGroupStoreId = Object.keys(
        primitiveStore.selectedPrimitives
      )[0];
      const children = primitiveStore.meshes[selectedGroupStoreId].children;

      children.forEach((value) => {
        primitiveStore.updatePrimitive(
          value.userData['storeId'],
          value as THREE.Mesh
        );
      });

      while (children.length) {
        scene.attach(primitiveStore.meshes[children[0].userData['storeId']]);
      }

      primitiveStore.removeSelectedPrimitives(selectedGroupStoreId);
      primitiveStore.removePrimitive(selectedGroupStoreId);
      canvasHistoryStore.differUngroup(selectedGroupStoreId);
      break;
    case '잠그기':
      Object.entries(primitiveStore.selectedPrimitives).forEach(
        ([key, value]) => {
          value.userData['isLocked'] = true;

          primitiveStore.updatePrimitive(key, value);
        }
      );
      break;
    case '잠금 해제':
      Object.entries(primitiveStore.selectedPrimitives).forEach(
        ([key, value]) => {
          value.userData['isLocked'] = false;

          primitiveStore.updatePrimitive(key, value);
        }
      );
      break;
    case '숨기기':
      Object.entries(primitiveStore.selectedPrimitives).forEach(
        ([key, value]) => {
          value.visible = false;

          primitiveStore.updatePrimitive(key, value);
        }
      );
      break;
    case '보이기':
      Object.entries(primitiveStore.selectedPrimitives).forEach(
        ([key, value]) => {
          value.visible = true;

          primitiveStore.updatePrimitive(key, value);
        }
      );
      break;
    case '삭제':
      const selectedPrimitives = Object.keys(primitiveStore.selectedPrimitives);

      selectedPrimitives.forEach((key) => {
        scene.remove(primitiveStore.meshes[key]);
        primitiveStore.removePrimitive(key);
      });

      primitiveStore.clearSelectedPrimitives();
      canvasHistoryStore.differDelete(selectedPrimitives[0]);
      break;
  }
  contextMenuStore.updateSelectedContextMenu('NONE');
};

export default executeContextMenu;
