import { GIZMO_MODE } from '@/features/controllerBar/constants/gizmo';
import { GizmoModeType } from '@/features/controllerBar/types/gizmo';
import Icon from '@components/common/Icon.tsx';

interface Props {
  mode: GizmoModeType;
}

const GizmoIcon = ({ mode }: Props) => {
  let defaultSrc;
  let activeSrc;

  if (mode === GIZMO_MODE.GLOBAL) {
    defaultSrc = '/icons/controllerBar/gizmo-global.svg';
    activeSrc = '/icons/controllerBar/gizmo-global-active.svg';
  } else {
    defaultSrc = '/icons/controllerBar/gizmo-local.svg';
    activeSrc = '/icons/controllerBar/gizmo-local-active.svg';
  }

  return (
    <Icon
      defaultSrc={defaultSrc}
      activeSrc={activeSrc}
      alt="기즈모 아이콘"
      activated={true}
    />
  );
};

export default GizmoIcon;
