import { observer } from "mobx-react";

import ControlDropdown from "@/features/controllerBar/components/dropdown/ControlDropdown";
import GizmoModeControl from "./GizmoModeControl";
import GizmoIcon from "@/features/controllerBar/components/icons/GizmoIcon";
import controllerBarStore from "@/features/controllerBar/store/controllerBarStore";

const GizmoMode = observer(() => {
  const { gizmoMode } = controllerBarStore;

  return (
    <ControlDropdown
      icon={<GizmoIcon mode={gizmoMode} />}
      menu={<GizmoModeControl />}
      activated={true}
    />
  );
});

export default GizmoMode;
