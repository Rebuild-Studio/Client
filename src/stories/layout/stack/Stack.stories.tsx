import type { Meta, StoryObj } from "@storybook/react";
import Stack from "@components/common/stack/Stack";
import StackItem from "@components/common/stack/StackItem";
import { grayColors } from "@resources/colors/colors";
import { textsStoryDesc } from "@resources/texts";

const meta = {
  component: Stack,
  title: "Layout/Stack",
  tags: ["autodocs"],
  argTypes: {
    width: {
      control: {
        type: "text",
        description: ` ${textsStoryDesc.size}`,
      },
    },
    height: {
      control: {
        type: "text",
        description: ` ${textsStoryDesc.size}`,
      },
    },
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof Stack>;

const mockItems = [
  {
    label: "옵션1",
    value: "option1",
  },
  {
    label: "옵션2",
    value: "option2",
  },
  {
    label: "옵션3",
    value: "option3",
  },
];

export const Default = {
  args: {
    hoverBackgroundColor: grayColors.lightGray,
    height: "fit-content",
    width: "200px",
  },
  render: (args) => {
    return (
      <Stack {...args}>
        {mockItems.map((item) => {
          return <StackItem label={item.label}></StackItem>;
        })}
      </Stack>
    );
  },
} satisfies Story;

export const WithImagedStackItem = {
  args: {
    hoverBackgroundColor: grayColors.lightGray,
    height: "fit-content",
    width: "200px",
  },
  render: (args) => {
    return (
      <Stack {...args}>
        <StackItem label="이미지와 함께">
          <img src="/icons/common/CaretDown.svg" alt="CaretDown" />
        </StackItem>
        {mockItems.map((item) => {
          return <StackItem label={item.label}></StackItem>;
        })}
      </Stack>
    );
  },
} satisfies Story;
