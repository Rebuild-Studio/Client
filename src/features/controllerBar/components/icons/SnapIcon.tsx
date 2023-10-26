import Icon from '@components/common/Icon.tsx';
import controllerBarStore from '@/features/controllerBar/store/controllerBarStore';

const SnapIcon = () => {
  const { isAnySnapModeActivated } = controllerBarStore;

  return (
    <Icon
      defaultSrc="/icons/controllerBar/snap.svg"
      activeSrc="/icons/controllerBar/snap-active.svg"
      alt="스냅 아이콘"
      activated={isAnySnapModeActivated}
    />
  );
};

export default SnapIcon;
