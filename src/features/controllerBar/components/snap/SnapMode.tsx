import { observer } from "mobx-react";

import SnapModeControl from "@/features/controllerBar/components/snap/SnapModeControl";
import ControlDropdown from "@/features/controllerBar/components/dropdown/ControlDropdown";
import SnapIcon from "@/features/controllerBar/components/icons/SnapIcon";
import controllerBarStore from "@/features/controllerBar/store/controllerBarStore";

const SnapMode = observer(() => {
  const { isAnySnapModeActivated } = controllerBarStore;

  return (
    <ControlDropdown
      icon={<SnapIcon />}
      menu={<SnapModeControl />}
      activated={isAnySnapModeActivated}
    />
  );
});

export default SnapMode;
