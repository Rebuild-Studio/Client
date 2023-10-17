import type { Meta, StoryObj } from "@storybook/react";
import { ComponentList } from "@components/layout/componentList/ComponentList";

const meta = {
  component: ComponentList,
  title: "Component/Layout/ComponentList/ComponentList",
  tags: ["autodocs"]
} satisfies Meta<typeof ComponentList>;

export default meta;
type Story = StoryObj<typeof ComponentList>;

export const BasicComponentList = {
  args: {
    label: "project"
  }
} satisfies Story;
