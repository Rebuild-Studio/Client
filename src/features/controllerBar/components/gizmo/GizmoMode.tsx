import { observer } from "mobx-react-lite";
import ControlDropdown from "@/features/controllerBar/components/dropdown/ControlDropdown";
import GizmoIcon from "@/features/controllerBar/components/icons/GizmoIcon";
import controllerBarStore from "@/features/controllerBar/store/controllerBarStore";
import GizmoModeControl from "./GizmoModeControl";

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
