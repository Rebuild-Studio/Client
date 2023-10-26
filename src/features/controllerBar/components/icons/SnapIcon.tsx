import controllerBarStore from '@/features/controllerBar/store/controllerBarStore';
import Icon from '@components/common/Icon.tsx';

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
