import { observable } from "mobx";
import storeContainer from "./storeContainer";

type ContextMenuType =
  | "NONE"
  | "미리보기"
  | "그리드 숨기기"
  | "그리드 표시"
  | "저장"
  | "붙여넣기"
  | "복사"
  | "그룹"
  | "그룹 해제"
  | "잠그기"
  | "잠금 해제"
  | "숨기기"
  | "보이기"
  | "삭제"
  | "DIVIDER";

/**
 * [string, string, boolean] :
 * 첫 번째 값 기능명, 두 번째 값 기능 단축키, 활성화 여부
 * 단축키는 변경이 가능하므로 string
 */
type ContextMenuItemType = [ContextMenuType, string, boolean];

type OpenContextMenuType = "CANVAS" | "OBJECT" | "NONE";

interface ContextMenuRenderProps {
  xPos: number;
  yPos: number;
  items: ContextMenuItemType[];
}

interface ContextMenuProps {
  isContextMenuOpened: boolean;
  currentSelectedContextMenu: ContextMenuType;
  currentContextMenuType: ContextMenuRenderProps | null;
  updateIsContextMenuOpened: (state: boolean) => void;
  updateSelectedContextMenu: (state: ContextMenuType) => void;
  updateContextMenuType: (
    type: OpenContextMenuType,
    xPos: number,
    yPos: number,
  ) => void;
}

const contextMenuStore = observable<ContextMenuProps>({
  isContextMenuOpened: false,
  currentSelectedContextMenu: "NONE",
  currentContextMenuType: null,
  updateIsContextMenuOpened(state) {
    this.isContextMenuOpened = state;
  },
  updateSelectedContextMenu(state) {
    this.currentSelectedContextMenu = state;
    this.isContextMenuOpened = false;
  },
  updateContextMenuType(type, xPos, yPos) {
    switch (type) {
      case "CANVAS":
        this.currentContextMenuType = {
          xPos: xPos,
          yPos: yPos,
          items: renderCanvasContextMenuItems(),
        };
        break;
      case "OBJECT":
        this.currentContextMenuType = {
          xPos: xPos,
          yPos: yPos,
          items: renderObjectContextMenuItems(),
        };
        break;
      case "NONE":
        this.currentContextMenuType = null;
        break;
    }
  },
});

// 좋은 이름이 필요합니다.
const activeContextMenuItems: { [key: string]: ContextMenuItemType } = {
  preview: ["미리보기", "O", true],
  grid: ["그리드 표시", "Z", true],
  save: ["저장", "Ctrl+S", true],
  paste: ["붙여넣기", "Ctrl+V", true],
  copy: ["복사", "Ctrl+C", true],
  group: ["그룹", "Ctrl+G", true],
  lock: ["잠그기", "Ctrl+L", true],
  hide: ["숨기기", "Ctrl+.", true],
  visible: ["보이기", "Ctrl+,", true],
  delete: ["삭제", "Del", true],
};

const inactiveContextMenuItems: { [key: string]: ContextMenuItemType } = {
  grid: ["그리드 숨기기", "Z", true],
  copy: ["복사", "Ctrl+C", false],
  paste: ["붙여넣기", "Ctrl+V", false],
  group: ["그룹 해제", "Ctrl+G", true],
  divider: ["DIVIDER", "", false],
  hide: ["숨기기", "Ctrl+.", false],
  visible: ["보이기", "Ctrl+,", false],
  lock: ["잠금 해제", "Ctrl+L", true],
};

const renderCanvasContextMenuItems = (): ContextMenuItemType[] => {
  const { projectStateStore } = storeContainer;
  const res: ContextMenuItemType[] = [];

  res.push(activeContextMenuItems.preview);

  if (projectStateStore.gridVisible === "VISIBLE") {
    res.push(inactiveContextMenuItems.grid);
  } else {
    res.push(activeContextMenuItems.grid);
  }

  res.push(activeContextMenuItems.save);

  if (Object.keys(projectStateStore.currentCopyPrimitive).length !== 0) {
    res.push(activeContextMenuItems.paste);
  } else {
    res.push(inactiveContextMenuItems.paste);
  }

  return res;
};

const renderObjectContextMenuItems = (): ContextMenuItemType[] => {
  const { projectStateStore, primitiveStore } = storeContainer;
  const res: ContextMenuItemType[] = [];
  res.push(activeContextMenuItems.copy);

  if (Object.keys(projectStateStore.currentCopyPrimitive).length !== 0) {
    res.push(activeContextMenuItems.paste);
  } else {
    res.push(inactiveContextMenuItems.paste);
  }

  res.push(inactiveContextMenuItems.divider);

  if (Object.keys(primitiveStore.selectedPrimitives).length > 1) {
    res.push(activeContextMenuItems.group);
  }

  if (
    Object.keys(primitiveStore.selectedPrimitives).length === 1 &&
    Object.values(primitiveStore.selectedPrimitives)[0].name === "GROUP"
  ) {
    res.push(inactiveContextMenuItems.group);
  }

  res.push(inactiveContextMenuItems.divider);

  const isLocked = Object.values(primitiveStore.selectedPrimitives).find(
    (value) => {
      return value.userData["isLocked"] === true;
    },
  );

  if (isLocked) {
    res.push(inactiveContextMenuItems.lock);
  } else {
    res.push(activeContextMenuItems.lock);
  }

  const isVisible = Object.values(primitiveStore.selectedPrimitives).find(
    (value) => {
      return value.visible === true;
    },
  );

  if (isVisible) {
    res.push(activeContextMenuItems.hide);
  } else {
    res.push(activeContextMenuItems.visible);
  }

  res.push(activeContextMenuItems.delete);

  if (isLocked) {
    const lockMenu: ContextMenuItemType[] = [];
    for (let i = 0; i < res.length; i++) {
      lockMenu.push([res[i][0], res[i][1], false]);
      if (lockMenu[i][0] === "잠금 해제") {
        lockMenu[i][2] = true;
      }
    }
    return lockMenu;
  }

  return res;
};

export type { ContextMenuItemType };
export default contextMenuStore;
