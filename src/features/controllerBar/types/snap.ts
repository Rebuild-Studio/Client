import { SNAP_MODE } from "@/features/controllerBar/constants/snap";

export type SnapModeType = (typeof SNAP_MODE)[keyof typeof SNAP_MODE];
