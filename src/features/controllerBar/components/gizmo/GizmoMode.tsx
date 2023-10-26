import { observer } from 'mobx-react';
import ControlDropdown from '@/features/controllerBar/components/dropdown/ControlDropdown';
import GizmoIcon from '@/features/controllerBar/components/icons/GizmoIcon';
import controllerBarStore from '@/features/controllerBar/store/controllerBar.store.ts';
import GizmoModeControl from './GizmoModeControl';

const GizmoMode = () => {
  const { gizmoMode } = controllerBarStore;

  return (
    <ControlDropdown
      icon={<GizmoIcon mode={gizmoMode} />}
      menu={<GizmoModeControl />}
      activated={true}
    />
  );
};

const Observer = observer(GizmoMode);
export default Observer;
