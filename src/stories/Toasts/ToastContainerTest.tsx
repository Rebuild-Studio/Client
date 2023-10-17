import { ToastPosition } from "@/types/style/toastPosition";
import ToastContainer from "@components/common/ToastContainer";
import { useToast } from "@hooks/useToast";

interface ToastContainerTestProps {
  position?: ToastPosition;
}

const ToastContainerTest = ({
  position = "topCenter",
}: ToastContainerTestProps) => {
  const { addToast } = useToast();

  const addToastMessage = () => addToast("토스트 추가하기를 누르셨습니다");
  const addLongToastMessage = () =>
    addToast("길~~~~고 길~~~다란 토스트를 추가하셨습니다!");
  const addHi = () => addToast("안녕");

  return (
    <div>
      <button onClick={addToastMessage}>토스트 추가하기</button>
      <button onClick={addLongToastMessage}>길~다란 토스트 추가하기</button>
      <button onClick={addHi}> "안녕" 추가하기</button>
      <ToastContainer position={position} />
    </div>
  );
};

export default ToastContainerTest;
