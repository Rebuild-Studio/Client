import type { Meta, StoryObj } from "@storybook/react";
import Button from "@components/common/Button";

const meta = {
  component: Button,
  title: "Component/Buttons/Button",
  tags: ["autodocs"],
  argTypes: {
    onClick: {
      action: "onClick"
    },
    color: { control: "color" },
    backgroundColor: { control: "color" },
    hoverBackgroundColor: { control: "color" },
    size: {
      control: "text"
    }
  },
  parameters: {
    docs: {
      description: {
        component: "아이콘 버튼 컴포넌트입니다."
      }
    }
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const lightButtonDefault = {
  args: {
    size: "74px",
    shadow: "none",
    backgroundImage: "/icons/studio/btn_capsule.svg",
    hoverBackgroundImage: "/icons/studio/btn_capsule_active.svg"
  }
} satisfies Story;

export const libraryButtonDefault = {
  args: {
    size: "86px",
    shadow: "none",
    backgroundImage: "/icons/studio/btn_library.svg",
    hoverBackgroundImage: "/icons/studio/btn_library_active.svg"
  }
} satisfies Story;
