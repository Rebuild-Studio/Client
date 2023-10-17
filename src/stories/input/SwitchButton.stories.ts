import { Meta, StoryObj } from "@storybook/react";
import Switch from "@components/buttons/SwitchButton";

const meta = {
  component: Switch,
  title: "Component/Input/SwitchButton",
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" }
  }
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof Switch>;

const BasicSwitchButton = {} satisfies Story;

export { BasicSwitchButton };
