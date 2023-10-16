import { observable } from "mobx";

export enum GIZMO_MODE {
  GLOBAL = "GLOBAL",
  LOCAL = "LOCAL",
}

export enum SNAP_MODE {
  GRID = "GRID",
  ROTATE = "ROTATE",
  SURFACE = "SURFACE",
}

interface ControllerBarStoreProps {
  gizmoMode: GIZMO_MODE;
  snapMode: Record<SNAP_MODE, boolean>;
  surfaceSnapAxisEnabled: boolean;
  isAnySnapModeActivated: boolean;
  setGizmoMode: (mode: GIZMO_MODE) => void;
  toggleSnapMode: (mode: SNAP_MODE) => void;
  setSurfaceSnapAxis: (enabled: boolean) => void;
}

const controllerBarStore = observable<ControllerBarStoreProps>({
  gizmoMode: GIZMO_MODE.GLOBAL,
  snapMode: {
    [SNAP_MODE.GRID]: false,
    [SNAP_MODE.ROTATE]: false,
    [SNAP_MODE.SURFACE]: false,
  },
  surfaceSnapAxisEnabled: true,
  get isAnySnapModeActivated(): boolean {
    return Object.values(controllerBarStore.snapMode).some((v) => v);
  },
  setGizmoMode: (mode: GIZMO_MODE) => {
    controllerBarStore.gizmoMode = mode;
  },
  toggleSnapMode: (mode: SNAP_MODE) => {
    controllerBarStore.snapMode[mode] = !controllerBarStore.snapMode[mode];
  },
  setSurfaceSnapAxis: (enabled: boolean) => {
    controllerBarStore.surfaceSnapAxisEnabled = enabled;
  },
});

export default controllerBarStore;
