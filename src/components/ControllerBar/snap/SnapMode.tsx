import { observer } from "mobx-react-lite";

import SnapModeControl from "@components/ControllerBar/snap/SnapModeControl";
import ControlDropdown from "@components/ControllerBar/dropdown/ControlDropdown";
import controllerBarStore from "@store/controllerBarStore";
import SnapIcon from "../icons/snap.svg?react";

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
