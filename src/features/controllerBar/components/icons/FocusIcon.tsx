import ControlIcon from "@/features/controllerBar/components/icons/ControlIcon";

const FocusIcon = () => {
  return (
    <ControlIcon
      defaultSrc="/icons/controllerBar/focus.svg"
      activeSrc="/icons/controllerBar/focus-active.svg"
      alt="포커스 아이콘"
      activated={false}
    />
  );
};

export default FocusIcon;
