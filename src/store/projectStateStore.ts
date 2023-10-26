import { makeAutoObservable } from 'mobx';
import { MeshType } from './primitiveStore';

type DisplayType = 'CANVAS' | 'INTERACTION' | 'PREVIEW';

class ProjectStateStore {
  currentDisplay: DisplayType = 'CANVAS';
  currentCopyPrimitive: MeshType = {};
  canGrouping = false;
  isModalOpened = false;
  isModalCancelable = true;
  modalComponent: JSX.Element | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  updateDisplay(type: DisplayType) {
    this.currentDisplay = type;
  }
  updateCurrentCopyPrimitive(copyMeshes: MeshType) {
    this.currentCopyPrimitive = copyMeshes;
  }
  updateCanGrouping(state: boolean) {
    this.canGrouping = state;
  }
  updateModalState(isOpened: boolean) {
    this.isModalOpened = isOpened;
  }
  updateModalComponent(component: JSX.Element) {
    this.modalComponent = component;
  }
  updateModalCancelable(isCancelable: boolean) {
    this.isModalCancelable = isCancelable;
  }
  clearModal() {
    this.isModalOpened = false;
    this.isModalCancelable = true;
    this.modalComponent = null;
  }
}

const projectStateStore = new ProjectStateStore();

export default projectStateStore;
