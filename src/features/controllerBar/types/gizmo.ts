import { GIZMO_MODE } from "@/features/controllerBar/constants/gizmo";

export type GizmoModeType = (typeof GIZMO_MODE)[keyof typeof GIZMO_MODE];
