import StackItem from "@/components/common/stack/StackItem";
import { grayColors } from "@/resources/colors/colors";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: StackItem,
  title: "Layout/StackItem",
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StackItem>;

export default meta;
type Story = StoryObj<typeof StackItem>;

export const Default = {
  args: {
    label: "옵션1",
    hoverBackgroundColor: grayColors.lightGray,
  },
} satisfies Story;

export const StackItemWithImage = {
  args: {
    label: "옵션1",
    hoverBackgroundColor: grayColors.lightGray,
  },
  render: (args) => {
    return (
      <StackItem {...args}>
        <img src="/icons/common/CaretDown.svg" alt="CaretDown" />
      </StackItem>
    );
  },
} satisfies Story;
