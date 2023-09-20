import { ProjectCard } from "@/components/layout/componentList/card/ProjectCard";
import { bgColors } from "@/resources/colors/colors";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: ProjectCard,
  title: "Component/Layout/ComponentList/Card/ProjectCard",
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "my-custom-background",
      values: [
        {
          name: "my-custom-background",
          value: bgColors[282828],
        },
      ],
    },
  },
} satisfies Meta<typeof ProjectCard>;

export default meta;
type Story = StoryObj<typeof ProjectCard>;

export const Project = {
  args: {
    name: "Componenet name(1)",
    thumbnail: "/Icons/project/projcetListCard_test.png",
    savedAt: "2023년-09월-07일 13:56",
    isClicked: false,
  },
} satisfies Story;
