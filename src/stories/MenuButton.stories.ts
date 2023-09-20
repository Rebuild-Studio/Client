import MenuButton from "@/components/common/MenuButton";
import { basicColors, grayColors } from "@/resources/colors/colors";
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

export const confirmButton = {
  args: {
    label: "불러오기",
    width: "138px",
    height: "32px",
    minHeight: "34px",
    minWidth: "80px",
    borderRadius: "6px",
    backgroundColor: basicColors.lightLimeGreen,
    fontFamily: "SourceHanSansKR",
    fontSize: "small",
    fontWeight: 500,
    color: "#101728",
    hoverBackgroundColor: "#d4ed3e",
  },
} satisfies Story;

export const CancelButton = {
  args: {
    label: "닫기",
    width: "138px",
    height: "32px",
    minHeight: "34px",
    minWidth: "80px",
    borderRadius: "6px",
    backgroundColor: "#282828",
    fontFamily: "SpoqaHanSansNeo",
    fontSize: "small",
    fontWeight: 500,
    color: "#fff",
    hoverBackgroundColor: grayColors[808080],
  },
} satisfies Story;
