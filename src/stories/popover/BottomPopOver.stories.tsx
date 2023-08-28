import { Meta, StoryObj } from "@storybook/react";
import { styled } from "styled-components";
import { basicColors, grayColors } from "@/resources/colors/colors";
import BottomPopOver from "@/components/layout/popover/BottomPopOver";

const meta = {
  component: BottomPopOver,
  title: "Component/Layout/PopOver/BottomPopOver",
  tags: ["autodocs"],
} satisfies Meta<typeof BottomPopOver>;

export default meta;
type Story = StoryObj<typeof BottomPopOver>;

const PopOver = {
  render: () => {
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
          <Content
            onClick={() => {
              console.log("1번");
            }}
          >
            1번
          </Content>
          <Content>2번</Content>
          <Content>3번</Content>
          <Content>4번</Content>
        </div>
      );
    };
    return (
      <>
        <BottomPopOver triggerComponent={<TriggerComponent />}>
          <ContentComponent />
        </BottomPopOver>
        <div>테스트 div</div>
      </>
    );
  },
} satisfies Story;

export { PopOver };
