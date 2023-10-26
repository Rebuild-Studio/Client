import { makeAutoObservable } from 'mobx';
import storeContainer from './storeContainer';

type ContextMenuType =
  | 'NONE'
  | '미리보기'
  | '그리드 숨기기'
  | '그리드 표시'
  | '저장'
  | '붙여넣기'
  | '복사'
  | '그룹'
  | '그룹 해제'
  | '잠그기'
  | '잠금 해제'
  | '숨기기'
  | '보이기'
  | '삭제'
  | 'DIVIDER';

/**
 * [string, string, boolean] :
 * 첫 번째 값 기능명, 두 번째 값 기능 단축키, 활성화 여부
 * 단축키는 변경이 가능하므로 string
 */
type ContextMenuItemType = [ContextMenuType, string, boolean];

type OpenContextMenuType = 'CANVAS' | 'OBJECT' | 'NONE';

interface ContextMenuRenderProps {
  xPos: number;
  yPos: number;
  items: ContextMenuItemType[];
}

class ContextMenuStore {
  isContextMenuOpened = false;
  currentSelectedContextMenu: ContextMenuType = 'NONE';
  currentContextMenuType: ContextMenuRenderProps | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  updateIsContextMenuOpened(state: boolean) {
    this.isContextMenuOpened = state;
  }
  updateSelectedContextMenu(state: ContextMenuType) {
    this.currentSelectedContextMenu = state;
    this.isContextMenuOpened = false;
  }
  updateContextMenuType(type: OpenContextMenuType, xPos: number, yPos: number) {
    switch (type) {
      case 'CANVAS':
        this.currentContextMenuType = {
          xPos: xPos,
          yPos: yPos,
          items: renderCanvasContextMenuItems()
        };
        break;
      case 'OBJECT':
        this.currentContextMenuType = {
          xPos: xPos,
          yPos: yPos,
          items: renderObjectContextMenuItems()
        };
        break;
      case 'NONE':
        this.currentContextMenuType = null;
        break;
    }
  }
}

// 좋은 이름이 필요합니다.
const activeContextMenuItems: { [key: string]: ContextMenuItemType } = {
  preview: ['미리보기', 'O', true],
  grid: ['그리드 표시', 'Z', true],
  save: ['저장', 'Ctrl+S', true],
  paste: ['붙여넣기', 'Ctrl+V', true],
  copy: ['복사', 'Ctrl+C', true],
  group: ['그룹', 'Ctrl+G', true],
  lock: ['잠그기', 'Ctrl+L', true],
  hide: ['숨기기', 'Ctrl+.', true],
  visible: ['보이기', 'Ctrl+,', true],
  delete: ['삭제', 'Del', true]
};

const inactiveContextMenuItems: { [key: string]: ContextMenuItemType } = {
  grid: ['그리드 숨기기', 'Z', true],
  copy: ['복사', 'Ctrl+C', false],
  paste: ['붙여넣기', 'Ctrl+V', false],
  group: ['그룹 해제', 'Ctrl+G', true],
  divider: ['DIVIDER', '', false],
  hide: ['숨기기', 'Ctrl+.', false],
  visible: ['보이기', 'Ctrl+,', false],
  lock: ['잠금 해제', 'Ctrl+L', true]
};

const renderCanvasContextMenuItems = (): ContextMenuItemType[] => {
  const { projectStateStore, sceneSettingStore } = storeContainer;
  const resContextMenuItems: ContextMenuItemType[] = [];

  resContextMenuItems.push(activeContextMenuItems.preview);

  if (sceneSettingStore.isGridVisible || sceneSettingStore.isAxisVisible) {
    resContextMenuItems.push(inactiveContextMenuItems.grid);
  } else {
    resContextMenuItems.push(activeContextMenuItems.grid);
  }

  resContextMenuItems.push(activeContextMenuItems.save);

  if (Object.keys(projectStateStore.currentCopyPrimitive).length !== 0) {
    resContextMenuItems.push(activeContextMenuItems.paste);
  } else {
    resContextMenuItems.push(inactiveContextMenuItems.paste);
  }

  return resContextMenuItems;
};

const renderObjectContextMenuItems = (): ContextMenuItemType[] => {
  const { projectStateStore, primitiveStore } = storeContainer;
  const resContextMenuItems: ContextMenuItemType[] = [];
  resContextMenuItems.push(activeContextMenuItems.copy);

  if (Object.keys(projectStateStore.currentCopyPrimitive).length !== 0) {
    resContextMenuItems.push(activeContextMenuItems.paste);
  } else {
    resContextMenuItems.push(inactiveContextMenuItems.paste);
  }

  resContextMenuItems.push(inactiveContextMenuItems.divider);

  if (Object.keys(primitiveStore.selectedPrimitives).length > 1) {
    resContextMenuItems.push(activeContextMenuItems.group);
  }

  if (
    Object.keys(primitiveStore.selectedPrimitives).length === 1 &&
    Object.values(primitiveStore.selectedPrimitives)[0].name === 'GROUP'
  ) {
    resContextMenuItems.push(inactiveContextMenuItems.group);
  }

  resContextMenuItems.push(inactiveContextMenuItems.divider);

  const isLocked = Object.values(primitiveStore.selectedPrimitives).find(
    (value) => {
      return value.userData['isLocked'] === true;
    }
  );

  if (isLocked) {
    resContextMenuItems.push(inactiveContextMenuItems.lock);
  } else {
    resContextMenuItems.push(activeContextMenuItems.lock);
  }

  const isObjectInvisible = Object.values(
    primitiveStore.selectedPrimitives
  ).find((value) => {
    return !value.visible;
  });

  if (isObjectInvisible) {
    resContextMenuItems.push(activeContextMenuItems.visible);
  } else {
    resContextMenuItems.push(activeContextMenuItems.hide);
  }

  resContextMenuItems.push(activeContextMenuItems.delete);

  if (isLocked) {
    const lockMenu: ContextMenuItemType[] = [];
    resContextMenuItems.forEach(([contextmenuType, hotKey], index) => {
      lockMenu.push([contextmenuType, hotKey, false]);
      if (contextmenuType === '잠금 해제') {
        lockMenu[index][2] = true;
      }
    });

    return lockMenu;
  }

  if (isObjectInvisible) {
    resContextMenuItems.forEach(([contextMenuType, ,], index) => {
      switch (contextMenuType) {
        case '그룹': {
          resContextMenuItems[index][2] = false;
          break;
        }
      }
    });
  }

  return resContextMenuItems;
};

const contextMenuStore = new ContextMenuStore();

export type { ContextMenuRenderProps, ContextMenuItemType };
export default contextMenuStore;
