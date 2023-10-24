import { Card } from "@/components/common/Card";
import type { Meta, StoryObj } from "@storybook/react";

const TestBox = () => {
  return <div>test box!!</div>;
};

const meta = {
  component: TestBox,
  title: "Component/TestBox",
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof Card>;

export const Example = {
  args: {},
} satisfies Story;
