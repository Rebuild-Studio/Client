import { Meta, StoryObj } from "@storybook/react";
import PopOverContainer from "../../components/layout/popover/PopOverContainer";
import { styled } from "styled-components";
import { basicColors, grayColors } from "@/resources/colors/colors";

const meta = {
  component: PopOverContainer,
  title: "Component/Layout/PopOverContainer",
  tags: ["autodocs"],
} satisfies Meta<typeof PopOverContainer>;

export default meta;
type Story = StoryObj<typeof PopOverContainer>;

const PopOver = {
  render: (args) => {
    const Trigger = styled.button`
      width: 156px;
      height: 56px;
      cursor: pointer;
    `;

    const TriggerComponent = () => {
      return <Trigger>트리거</Trigger>;
    };

    const Content = styled.div`
      color: ${grayColors[535353]};
      font-size: 24px;
      background-color: ${basicColors.black};
    `;

    const ContentComponent = () => {
      return (
        <div>
          <Content>1번</Content>
          <Content>2번</Content>
          <Content>3번</Content>
          <Content>4번</Content>
        </div>
      );
    };
    return (
      <>
        <PopOverContainer triggerComponent={<TriggerComponent />}>
          <ContentComponent />
        </PopOverContainer>
        <div>테스트 div</div>
      </>
    );
  },
} satisfies Story;

export { PopOver };
