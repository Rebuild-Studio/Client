import { ProjectCards } from "@/features/projectList/components/ProjectCards";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: ProjectCards,
  title: "Component/Layout/ComponentList/ProjectCards",
  tags: ["autodocs"],
} satisfies Meta<typeof ProjectCards>;

export default meta;
type Story = StoryObj<typeof ProjectCards>;

export const basic = {
  args: {
    componentData: [
      {
        id: "1",
        name: "Componenet name(1)",
        thumbnail: "/icons/project/projcetListCard_test.png",
        savedAt: "2023년-09월-07일 13:56",
        isClicked: false,
      },
      {
        id: "2",
        name: "Componenet name(2)",
        thumbnail: "/icons/project/projcetListCard_test.png",
        savedAt: "2022년-02월-07일 01:00",
        isClicked: false,
      },
      {
        id: "3",
        name: "Componenet name(3)",
        thumbnail: "/icons/project/projcetListCard_test.png",
        savedAt: "2022년-10월-27일 12:30",
        isClicked: false,
      },
    ],
  },
} satisfies Story;
