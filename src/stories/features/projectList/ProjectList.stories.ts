import ProjectList from "@/features/projectList/components/ProjectList";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: ProjectList,
  title: "Feature/ProjectList/ProjectList",
  tags: ["autodocs"],
} satisfies Meta<typeof ProjectList>;

export default meta;
type Story = StoryObj<typeof ProjectList>;

export const BasicProjectList = {
  args: {
    label: "project",
  },
} satisfies Story;
