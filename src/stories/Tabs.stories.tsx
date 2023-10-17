import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "@components/layout/Tabs";
import { basicColors, bgColors } from "@resources/colors/colors";

const meta = {
  component: Tabs,
  title: "Component/Layout/Tabs",
  tags: ["autodocs"]
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof Tabs>;

export const BasicTab = {
  args: {
    color: basicColors.white,
    backgroundColor: bgColors[101728],
    selectedColor: basicColors.lightLimeGreen,
    underbarColor: basicColors.lightLimeGreen,
    labelList: ["aa", "bb", "cc", "fffff"],
    width: "800px",
    height: "30px",
    underbarHeight: "4px",
    underbarWidth: "50px",
    onChange: (index) => {
      console.log(index);
    }
  }
} satisfies Story;
