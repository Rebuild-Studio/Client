import ControlButton from "@/features/controllerBar/components/ControlButton";
import FocusIcon from "@/features/controllerBar/components/icons/FocusIcon";

const ObjectFocus = () => {
  const handleObjectFocus = () => {
    // TODO: 오브젝트 포커스 기능 추가
    console.log("오브젝트 포커스");
  };

  return <ControlButton icon={<FocusIcon />} onClick={handleObjectFocus} />;
};

export default ObjectFocus;
