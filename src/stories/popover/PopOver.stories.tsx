import { Meta, StoryObj } from "@storybook/react";
import PopOver from "../../components/layout/popover/PopOver";
import { styled } from "styled-components";
import { basicColors, grayColors } from "@/resources/colors/colors";

const meta = {
  component: PopOver,
  title: "Component/Layout/PopOver",
  tags: ["autodocs"],
} satisfies Meta<typeof PopOver>;

export default meta;
type Story = StoryObj<typeof PopOver>;

const BasicPopOver = {
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
        <PopOver triggerComponent={<TriggerComponent />}>
          <ContentComponent />
        </PopOver>
        <div>테스트 div</div>
      </>
    );
  },
} satisfies Story;

const TopPopOver = {
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
        <br />
        <PopOver triggerComponent={<TriggerComponent />} gravity="TOP">
          <ContentComponent />
        </PopOver>
        <div>테스트 div</div>
      </>
    );
  },
} satisfies Story;

export { BasicPopOver, TopPopOver };
