import { Meta, StoryObj } from "@storybook/react";
import { styled } from "styled-components";
import TopPopOver from "@components/layout/popover/TopPopOver";
import { basicColors, grayColors } from "@resources/colors/colors";

const meta = {
  component: TopPopOver,
  title: "Component/Layout/PopOver/TopPopOver",
  tags: ["autodocs"]
} satisfies Meta<typeof TopPopOver>;

export default meta;
type Story = StoryObj<typeof TopPopOver>;

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
        <br />
        <br />
        <br />
        <br />
        <div>테스트 div</div>
        <TopPopOver triggerComponent={<TriggerComponent />}>
          <ContentComponent />
        </TopPopOver>
      </>
    );
  }
} satisfies Story;

export { PopOver };
