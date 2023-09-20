import { LeftPanel } from "@/components/LeftPanel";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: LeftPanel,
  title: "Component/layout/LeftPanel",
  tags: ["autodocs"],
} satisfies Meta<typeof LeftPanel>;

export default meta;
type Story = StoryObj<typeof LeftPanel>;

export const Basic = {} satisfies Story;
