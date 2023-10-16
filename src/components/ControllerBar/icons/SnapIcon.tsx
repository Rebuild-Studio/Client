import ControlIcon from "@components/ControllerBar/icons/ControlIcon";
import controllerBarStore from "@store/controllerBarStore";

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
