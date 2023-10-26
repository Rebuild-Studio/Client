import { makeAutoObservable } from "mobx";
import { GIZMO_MODE } from "@/features/controllerBar/constants/gizmo";
import { SNAP_MODE } from "@/features/controllerBar/constants/snap";
import { GizmoModeType } from "@/features/controllerBar/types/gizmo";
import { SnapModeType } from "@/features/controllerBar/types/snap";

class ControllerBarStore {
  gizmoMode: GizmoModeType = GIZMO_MODE.GLOBAL;
  snapMode: Record<SnapModeType, boolean> = {
    [SNAP_MODE.GRID]: false,
    [SNAP_MODE.ROTATE]: false,
    [SNAP_MODE.SURFACE]: false,
  };
  surfaceSnapAxisEnabled = true;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get isAnySnapModeActivated() {
    return Object.values(this.snapMode).some((v) => v);
  }
  setGizmoMode(mode: GizmoModeType) {
    this.gizmoMode = mode;
  }
  toggleSnapMode(mode: SnapModeType) {
    this.snapMode[mode] = !this.snapMode[mode];
  }
  setSurfaceSnapAxis(enabled: boolean) {
    this.surfaceSnapAxisEnabled = enabled;
  }
}

const controllerBarStore = new ControllerBarStore();

export default controllerBarStore;
