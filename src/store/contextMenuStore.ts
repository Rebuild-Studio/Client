import { observable } from "mobx";

type ContextMenuType =
  | "NONE"
  | "미리보기"
  | "그리드 숨기기"
  | "저장"
  | "붙여넣기"
  | "복사"
  | "그룹"
  | "잠그기"
  | "숨기기"
  | "삭제"
  | "DIVIDER";

/**
 * [string, string, () => void] : 첫 번째 값 기능명, 두 번째 값 기능 단축키, 동작 함수
 */
type ContextMenuItemType = [ContextMenuType, string, () => void];

interface ContextMenuProps {
  currentContextMenuItem: ContextMenuType;
  showPreview: () => void;
  hideGrid: () => void;
  saveProject: () => void;
  copyObject: () => void;
  pasteObject: () => void;
  groupObjects: () => void;
  lockObject: () => void;
  hideObject: () => void;
  deleteObject: () => void;
}

const contextMenuStore = observable<ContextMenuProps>({
  currentContextMenuItem: "NONE",
  showPreview() {
    this.currentContextMenuItem = "미리보기";
  },
  hideGrid() {
    this.currentContextMenuItem = "그리드 숨기기";
  },
  saveProject() {
    this.currentContextMenuItem = "저장";
  },
  copyObject() {
    this.currentContextMenuItem = "복사";
  },
  pasteObject() {
    this.currentContextMenuItem = "붙여넣기";
  },
  groupObjects() {
    this.currentContextMenuItem = "그룹";
  },
  lockObject() {
    this.currentContextMenuItem = "잠그기";
  },
  hideObject() {
    this.currentContextMenuItem = "숨기기";
  },
  deleteObject() {
    this.currentContextMenuItem = "삭제";
  },
});

const canvasContextMenuItems: ContextMenuItemType[] = [
  ["미리보기", "O", contextMenuStore.showPreview],
];

export { canvasContextMenuItems };
export type { ContextMenuItemType };
export default contextMenuStore;
