import { styled } from "styled-components";

// 실제로 사용시에는 ReactDOM.createPortal에 감싸서 사용해야 함
// id는 modal-root
interface ModalProps {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const Modal = (props: ModalProps) => {
  const setOnClickListener = () => {
    props.setIsOpened(false);
  };

  const stopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <>
      <ModalBackground>
        <ModalWrapper onClick={setOnClickListener}>
          <ModalContentWrapper onClick={stopPropagation}>
            {props.children}
          </ModalContentWrapper>
        </ModalWrapper>
      </ModalBackground>
    </>
  );
};

export default Modal;

const ModalBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  box-sizing: border-box;
  z-index: 10;
  width: 100vw;
  height: 100vh;
`;

const ModalWrapper = styled.div`
  box-sizing: inherit;
  position: relative;
  width: 100%;
  height: 100%;
`;

const ModalContentWrapper = styled.div`
  position: absolute;
  display: inline-block;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
