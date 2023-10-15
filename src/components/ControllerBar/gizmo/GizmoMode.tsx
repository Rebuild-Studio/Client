import { observer } from "mobx-react-lite";

import ControlDropdown from "@components/ControllerBar/dropdown/ControlDropdown";
import GizmoModeControl from "./GizmoModeControl";
import controllerBarStore, { GIZMO_MODE } from "@store/controllerBarStore";
import GizmoGlobalIcon from "../icons/gizmo_global.svg?react";
import GizmoLocalIcon from "../icons/gizmo_local.svg?react";

const GizmoMode = observer(() => {
  const { gizmoMode } = controllerBarStore;

  return (
    <ControlDropdown
      icon={
        gizmoMode === GIZMO_MODE.GLOBAL ? (
          <GizmoGlobalIcon />
        ) : (
          <GizmoLocalIcon />
        )
      }
      menu={<GizmoModeControl />}
      activated={true}
    />
  );
});

export default GizmoMode;
