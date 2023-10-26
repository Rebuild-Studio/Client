import storeContainer from '@/store/storeContainer';

const keyboardSceneEvents = () => {
  const {
    primitiveStore,
    keyboardEventStore,
    projectStateStore,
    contextMenuStore,
    sceneSettingStore
  } = storeContainer;

  const { isCtrlPressed } = keyboardEventStore.currentKeyEvent;

  switch (keyboardEventStore.currentKeyEvent.key.toLowerCase()) {
    case 'z': {
      // 그리드 숨기기 / 표시
      if (sceneSettingStore.isGridVisible || sceneSettingStore.isAxisVisible) {
        contextMenuStore.updateSelectedContextMenu('그리드 숨기기');
      } else {
        contextMenuStore.updateSelectedContextMenu('그리드 표시');
      }
      break;
    }
    case 'v': {
      // 붙여넣기
      if (!isCtrlPressed) {
        return;
      }

      if (Object.keys(projectStateStore.currentCopyPrimitive).length !== 0) {
        contextMenuStore.updateSelectedContextMenu('붙여넣기');
      }

      break;
    }
    case 'c': {
      // 복사
      if (!isCtrlPressed) {
        return;
      }

      contextMenuStore.updateSelectedContextMenu('복사');
      break;
    }
    case 'g': {
      // 그룹 / 그룹 해제
      if (!isCtrlPressed) {
        return;
      }

      if (Object.keys(primitiveStore.selectedPrimitives).length > 1) {
        contextMenuStore.updateSelectedContextMenu('그룹');
      }

      if (
        Object.keys(primitiveStore.selectedPrimitives).length === 1 &&
        Object.values(primitiveStore.selectedPrimitives)[0].name === 'GROUP'
      ) {
        contextMenuStore.updateSelectedContextMenu('그룹 해제');
      }

      break;
    }
    case 'l': {
      // 잠그기 / 잠금 해제
      if (!isCtrlPressed) {
        return;
      }

      const isLocked = Object.values(primitiveStore.selectedPrimitives).find(
        (value) => {
          return value.userData['isLocked'] === true;
        }
      );

      if (isLocked) {
        contextMenuStore.updateSelectedContextMenu('잠금 해제');
      } else {
        contextMenuStore.updateSelectedContextMenu('잠그기');
      }

      break;
    }
    case ',': {
      // 숨기기 / 보이기
      if (!isCtrlPressed) {
        return;
      }

      const isVisible = Object.values(primitiveStore.selectedPrimitives).find(
        (value) => {
          return value.visible === true;
        }
      );

      if (isVisible) {
        contextMenuStore.updateSelectedContextMenu('숨기기');
      } else {
        contextMenuStore.updateSelectedContextMenu('보이기');
      }

      break;
    }
    case 'delete': {
      // 삭제
      contextMenuStore.updateSelectedContextMenu('삭제');

      break;
    }
  }
};

export default keyboardSceneEvents;
