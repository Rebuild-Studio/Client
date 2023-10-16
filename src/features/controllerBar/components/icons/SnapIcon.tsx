import ControlIcon from "@/features/controllerBar/components/icons/ControlIcon";
import controllerBarStore from "@/features/controllerBar/store/controllerBarStore";

const SnapIcon = () => {
  const { isAnySnapModeActivated } = controllerBarStore;

  return (
    <ControlIcon
      defaultSrc="/icons/controllerBar/snap.svg"
      activeSrc="/icons/controllerBar/snap-active.svg"
      alt="스냅 아이콘"
      activated={isAnySnapModeActivated}
    />
  );
};

export default SnapIcon;
