import { TemplateCards } from "@/features/projectList/components/TemplateCards";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: TemplateCards,
  title: "Feature/ProjectList/TemplateCards",
  tags: ["autodocs"],
} satisfies Meta<typeof TemplateCards>;

export default meta;
type Story = StoryObj<typeof TemplateCards>;

export const Basic = {
  args: {},
} satisfies Story;
