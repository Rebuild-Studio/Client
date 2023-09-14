import { HistoryPanel } from "@/components/layout/HistoryPanel/HistoryPanel";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: HistoryPanel,
  title: "Component/layout/HistoryPanel",
  tags: ["autodocs"],
} satisfies Meta<typeof HistoryPanel>;

export default meta;
type Story = StoryObj<typeof HistoryPanel>;

export const Basic = {
  args: {
    undoList: [
      {
        id: "1",
        type: "object",
        attribute: "add",
        isRedo: true,
      },
      {
        id: "1",
        type: "object",
        attribute: "position",
        isRedo: true,
      },
      {
        id: "1",
        type: "material",
        attribute: "color",
        isRedo: true,
      },
    ],
    redoList: [
      {
        id: "1",
        type: "object",
        attribute: "add",
        isRedo: true,
      },
      {
        id: "1",
        type: "object",
        attribute: "position",
        isRedo: true,
      },
      {
        id: "1",
        type: "material",
        attribute: "color",
        isRedo: true,
      },
    ],
  },
} satisfies Story;
