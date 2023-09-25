import { observable } from "mobx";
import { MeshType } from "./primitiveStore";

type DisplayType = "CANVAS" | "INTERACTION" | "PREVIEW" | "LOADING";
type GridVisibleType = "VISIBLE" | "INVISIBLE";

interface ProjectStateProps {
  currentDisplay: DisplayType;
  gridVisible: GridVisibleType;
  currentCopyPrimitive: MeshType; // 복사한 prmitive storeId
  canGrouping: boolean; // 다중 선택인 경우 true
  updateDisplay: (type: DisplayType) => void;
  updateGridVisible: (state: GridVisibleType) => void;
  updateCurrentCopyPrimitive: (copyMeshes: MeshType) => void;
  updateCanGrouping: (state: boolean) => void;
}

const projectStateStore = observable<ProjectStateProps>({
  currentDisplay: "CANVAS",
  gridVisible: "VISIBLE",
  currentCopyPrimitive: {},
  canGrouping: false,
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
});

export default projectStateStore;
