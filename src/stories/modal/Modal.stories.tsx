import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import ReactDOM from "react-dom";
import { styled } from "styled-components";
import Modal from "@components/layout/modal/Modal";
import { basicColors } from "@resources/colors/colors";

const meta = {
  component: Modal,
  title: "Component/Layout/Modal",
  tags: ["autodocs"]
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof Modal>;

const BaseModal = {
  render: () => {
    const [isOpened, setIsOpened] = useState(false);

    const openModal = () => {
      setIsOpened(true);
    };
    const TestComponent = styled.div`
      width: 900px;
      height: 500px;
      background-color: ${basicColors.white};
    `;

    return (
      <>
        {/* {isOpened &&
          ReactDOM.createPortal(
            <Modal>
              <TestComponent></TestComponent>
            </Modal>,
            document.getElementById("storybook-root")! // 실제 코드에서는 modal-root로 변경
          )}
        <button onClick={openModal}>열려라 모달</button> */}
      </>
    );
  }
} satisfies Story;

export { BaseModal };
