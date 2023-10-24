import { ProjectCards } from "@/features/projectList/components/ProjectCards";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: ProjectCards,
  title: "Feature/ProjectList/ProjectCards",
  tags: ["autodocs"],
} satisfies Meta<typeof ProjectCards>;

export default meta;
type Story = StoryObj<typeof ProjectCards>;

export const Basic = {
  args: {
    projects: [],
  },
} satisfies Story;
