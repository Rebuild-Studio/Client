import Slider from "@/components/common/Slider";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Slider,
  title: "Component/Input/Slider",
  tags: ["autodocs"],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof Slider>;

const BasicSlider = {} satisfies Story;

export { BasicSlider };
