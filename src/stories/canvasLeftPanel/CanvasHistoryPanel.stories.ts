import type { Meta, StoryObj } from "@storybook/react";
import { HistoryPanel } from "@components/layout/CanvasLeftPanel/historyPanel/HistoryPanel";

const meta = {
  component: HistoryPanel,
  title: "Component/layout/CanvasLeftPanel/HistoryPanel",
  tags: ["autodocs"]
} satisfies Meta<typeof HistoryPanel>;

export default meta;
type Story = StoryObj<typeof HistoryPanel>;

export const Basic = {
  args: {
    undoList: [
      {
        id: "1",
        instance: "CUBE",
        attribute: "add",
        snapshot: {}
      },
      {
        id: "1",
        instance: "CONE",
        attribute: "add",
        snapshot: {}
      }
    ],
    redoList: [
      {
        id: "1",
        instance: "CUBE",
        attribute: "add",
        snapshot: {}
      },
      {
        id: "3",
        instance: "CYLINDER",
        attribute: "add",
        snapshot: {}
      },
      {
        id: "2",
        instance: "GROUP",
        attribute: "add",
        snapshot: {}
      }
    ]
  }
} satisfies Story;
