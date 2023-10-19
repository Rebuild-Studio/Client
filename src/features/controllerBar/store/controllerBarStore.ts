import { observable } from "mobx";

import { GIZMO_MODE } from "@/features/controllerBar/constants/gizmo";
import { SNAP_MODE } from "@/features/controllerBar/constants/snap";
import { GizmoModeType } from "@/features/controllerBar/types/gizmo";
import { SnapModeType } from "@/features/controllerBar/types/snap";

interface ControllerBarStoreProps {
  gizmoMode: GizmoModeType;
  snapMode: Record<SnapModeType, boolean>;
  surfaceSnapAxisEnabled: boolean;
  isAnySnapModeActivated: boolean;
  setGizmoMode: (mode: GizmoModeType) => void;
  toggleSnapMode: (mode: SnapModeType) => void;
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
  setGizmoMode: (mode: GizmoModeType) => {
    controllerBarStore.gizmoMode = mode;
  },
  toggleSnapMode: (mode: SnapModeType) => {
    controllerBarStore.snapMode[mode] = !controllerBarStore.snapMode[mode];
  },
  setSurfaceSnapAxis: (enabled: boolean) => {
    controllerBarStore.surfaceSnapAxisEnabled = enabled;
  },
});

export type { ControllerBarStoreProps }
export default controllerBarStore;
