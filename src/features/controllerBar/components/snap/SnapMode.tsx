import { observer } from 'mobx-react';
import ControlDropdown from '@/features/controllerBar/components/dropdown/ControlDropdown';
import SnapIcon from '@/features/controllerBar/components/icons/SnapIcon';
import SnapModeControl from '@/features/controllerBar/components/snap/SnapModeControl';
import controllerBarStore from '@/features/controllerBar/store/controllerBarStore';

const SnapMode = () => {
  const { isAnySnapModeActivated } = controllerBarStore;

  return (
    <ControlDropdown
      icon={<SnapIcon />}
      menu={<SnapModeControl />}
      activated={isAnySnapModeActivated}
    />
  );
};

const Observer = observer(SnapMode);
export default Observer;
