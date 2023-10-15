import { makeAutoObservable } from "mobx";

export enum GIZMO_MODE {
  GLOBAL = "GLOBAL",
  LOCAL = "LOCAL",
}

export enum SNAP_MODE {
  GRID = "GRID",
  ROTATE = "ROTATE",
  SURFACE = "SURFACE",
}

class ControllerBarStore {
  gizmoMode = GIZMO_MODE.GLOBAL;
  snapMode = {
    [SNAP_MODE.GRID]: false,
    [SNAP_MODE.ROTATE]: false,
    [SNAP_MODE.SURFACE]: false,
  };
  surfaceSnapAxisEnabled = true;

  constructor() {
    makeAutoObservable(this);
  }

  get isAnySnapModeActivated() {
    return Object.values(this.snapMode).some((v) => v);
  }

  setGizmoMode = (mode: GIZMO_MODE) => {
    this.gizmoMode = mode;
  };

  toggleSnapMode = (mode: SNAP_MODE) => {
    this.snapMode[mode] = !this.snapMode[mode];
  };

  setSurfaceSnapAxis = (enabled: boolean) => {
    this.surfaceSnapAxisEnabled = enabled;
  };
}

const controllerBarStore = new ControllerBarStore();

export default controllerBarStore;
