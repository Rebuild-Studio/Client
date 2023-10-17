import { createPortal } from "react-dom";
import styled from "styled-components";
import { POSITION_VARIANTS, ToastPosition } from "@/types/style/toastPosition";
import Toast from "@components/common/Toast";
import { useToast } from "@hooks/useToast";

interface ToastContainerProps {
  position?: ToastPosition;
}

const ToastContainer = ({ position = "topCenter" }: ToastContainerProps) => {
  const { toastMessages, removeToast } = useToast();

  const toastRoot = document.getElementById("toast-root");
  if (!toastRoot) {
    console.warn("toast-root element is missing in DOM");
    return null;
  }

  return createPortal(
    <StyledToastContainer position={position}>
      {toastMessages
        .map((message) => (
          <Toast
            key={message.id}
            label={message.content}
            onClose={() => removeToast(message.id)}
          />
        ))
        .reverse()}
    </StyledToastContainer>,
    toastRoot,
  );
};

const StyledToastContainer = styled.div<{ position: ToastPosition }>`
  position: fixed;
  ${({ position }) => ({ ...POSITION_VARIANTS[position] })};
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export default ToastContainer;
