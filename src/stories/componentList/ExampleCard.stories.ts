import { ExampleCard } from "@/features/projectList/components/card/ExampleCard";
import { bgColors } from "@/resources/colors/colors";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: ExampleCard,
  title: "Component/Layout/ComponentList/Card/ExampleCard",
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
} satisfies Meta<typeof ExampleCard>;

export default meta;
type Story = StoryObj<typeof ExampleCard>;

export const Example = {
  args: {
    name: "오피스 테마",
    thumbnail: "/example/StartScene_Office.png",
    isClicked: false,
  },
} satisfies Story;
