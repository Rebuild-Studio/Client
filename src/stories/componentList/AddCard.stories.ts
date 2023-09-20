import { AddCard } from "@/components/layout/componentList/card/AddCard";
import { bgColors } from "@/resources/colors/colors";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: AddCard,
  title: "Component/Layout/ComponentList/Card/AddCard",
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
} satisfies Meta<typeof AddCard>;

export default meta;
type Story = StoryObj<typeof AddCard>;

export const BasicComponentList = {
  args: {
    isClicked: false,
  },
} satisfies Story;
