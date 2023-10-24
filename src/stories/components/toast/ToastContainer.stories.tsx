import ToastContainerTest from "./ToastContainerTest";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: ToastContainerTest,
  title: "Component/ToastContainer",
  tags: ["autodocs"],
} satisfies Meta<typeof ToastContainerTest>;

export default meta;
type Story = StoryObj<typeof ToastContainerTest>;

export const Default = {
  args: {},
} satisfies Story;

export const PositionBottomLeft = {
  args: {
    position: "bottomLeft",
  },
} satisfies Story;
