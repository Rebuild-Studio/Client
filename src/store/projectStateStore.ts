import { observable } from "mobx";

type DisplayType = "CANVAS" | "INTERACTION" | "PREVIEW" | "LOADING";

interface ProjectStateProps {
  currentDisplay: DisplayType;
  isGridHide: boolean;
  currentCopyPrimitive: string[]; // 복사한 prmitive storeId
  canGrouping: boolean; // 다중 선택인 경우 true
  updateDisplay: (type: DisplayType) => void;
  updateGridHid: (state: boolean) => void;
  updateCurrentCopyPrimitive: (storeIds: string[]) => void;
  updateCanGrouping: (state: boolean) => void;
}

const projectStateStore = observable<ProjectStateProps>({
  currentDisplay: "CANVAS",
  isGridHide: false,
  currentCopyPrimitive: [],
  canGrouping: false,
  updateDisplay(type) {
    this.currentDisplay = type;
  },
  updateGridHid(state) {
    this.isGridHide = state;
  },
  updateCurrentCopyPrimitive(storeIds) {
    this.currentCopyPrimitive = storeIds;
  },
  updateCanGrouping(state) {
    this.canGrouping = state;
  },
});

export default projectStateStore;
