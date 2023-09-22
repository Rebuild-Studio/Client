import { CanvasLeftPanel } from "@/components/layout/CanvasLeftPanel/CanvasLeftPanel";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: CanvasLeftPanel,
  title: "Component/layout/LeftPanel",
  tags: ["autodocs"],
} satisfies Meta<typeof CanvasLeftPanel>;

export default meta;
type Story = StoryObj<typeof CanvasLeftPanel>;

export const Basic = {} satisfies Story;
