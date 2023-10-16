import { observer } from "mobx-react-lite";

import ControlDropdown from "@components/ControllerBar/dropdown/ControlDropdown";
import GizmoModeControl from "./GizmoModeControl";
import controllerBarStore from "@store/controllerBarStore";
import GizmoIcon from "@components/ControllerBar/icons/GizmoIcon";

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
