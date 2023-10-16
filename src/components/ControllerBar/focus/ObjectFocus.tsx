import ControlButton from "@components/ControllerBar/ControlButton";
import FocusIcon from "@components/ControllerBar/icons/FocusIcon";

const ObjectFocus = () => {
  const handleObjectFocus = () => {
    // TODO: 오브젝트 포커스 기능 추가
    console.log("오브젝트 포커스");
  };

  return <ControlButton icon={<FocusIcon />} onClick={handleObjectFocus} />;
};

export default ObjectFocus;
