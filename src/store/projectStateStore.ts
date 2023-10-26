import { observable } from "mobx";
import { MeshType } from "./primitiveStore";

type DisplayType = "CANVAS" | "INTERACTION" | "PREVIEW";

interface ProjectStateProps {
  currentDisplay: DisplayType;
  currentCopyPrimitive: MeshType; // 복사한 prmitive storeId
  canGrouping: boolean; // 다중 선택인 경우 true
  isModalOpened: boolean;
  isModalCancelable: boolean;
  modalComponent: JSX.Element | null;
  updateDisplay: (type: DisplayType) => void;
  updateCurrentCopyPrimitive: (copyMeshes: MeshType) => void;
  updateCanGrouping: (state: boolean) => void;
  updateModalState: (isOpened: boolean) => void;
  updateModalCancelable: (isCancelable: boolean) => void;
  updateModalComponent: (component: JSX.Element) => void;
  clearModal: () => void;
}

const projectStateStore = observable<ProjectStateProps>({
  currentDisplay: "CANVAS",
  currentCopyPrimitive: {},
  canGrouping: false,
  isModalOpened: false,
  isModalCancelable: true,
  modalComponent: null,
  updateDisplay(type) {
    this.currentDisplay = type;
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
  updateModalCancelable(isCancelable: boolean) {
    this.isModalCancelable = isCancelable;
  },
  clearModal() {
    this.isModalOpened = false;
    this.isModalCancelable = true;
    this.modalComponent = null;
  },
});

export type { ProjectStateProps };
export default projectStateStore;
