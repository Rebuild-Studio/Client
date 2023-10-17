import { observable } from "mobx";
import { MeshType } from "./primitiveStore";

type DisplayType = "CANVAS" | "INTERACTION" | "PREVIEW";
type GridVisibleType = "VISIBLE" | "INVISIBLE";

interface ProjectStateProps {
  currentDisplay: DisplayType;
  gridVisible: GridVisibleType;
  currentCopyPrimitive: MeshType; // 복사한 prmitive storeId
  canGrouping: boolean; // 다중 선택인 경우 true
  isModalOpened: boolean;
  modalComponent: JSX.Element | null;
  updateDisplay: (type: DisplayType) => void;
  updateGridVisible: (state: GridVisibleType) => void;
  updateCurrentCopyPrimitive: (copyMeshes: MeshType) => void;
  updateCanGrouping: (state: boolean) => void;
  updateModalState: (isOpened: boolean) => void;
  updateModalComponent: (component: JSX.Element) => void;
  clearModal: () => void;
}

const projectStateStore = observable<ProjectStateProps>({
  currentDisplay: "CANVAS",
  gridVisible: "VISIBLE",
  currentCopyPrimitive: {},
  canGrouping: false,
  isModalOpened: false,
  modalComponent: null,
  updateDisplay(type) {
    this.currentDisplay = type;
  },
  updateGridVisible(state) {
    this.gridVisible = state;
  },
  updateCurrentCopyPrimitive(copyMeshes) {
    this.currentCopyPrimitive = copyMeshes;
  },
  updateCanGrouping(state) {
    this.canGrouping = state;
  },
  updateModalState(isOpened) {
    this.isModalOpened = isOpened;
  },
  updateModalComponent(component) {
    this.modalComponent = component;
  },
  clearModal() {
    this.isModalOpened = false;
    this.modalComponent = null;
  }
});

export default projectStateStore;
