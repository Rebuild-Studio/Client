import MenuButton from "@/components/common/MenuButton";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: MenuButton,
  title: "Component/Buttons/MenuButton",
  tags: ["autodocs"],
} satisfies Meta<typeof MenuButton>;

export default meta;
type Story = StoryObj<typeof MenuButton>;

export const NormalButton = {
  args: {
    label: "활성화",
    color: "#ffffff",
    disabled: false,
    onClick: () => {
      alert("활성화");
    },
  },
} satisfies Story;

export const DisabledButton = {
  args: {
    label: "비활성화",
    color: "#dddddd",
  },
} satisfies Story;
