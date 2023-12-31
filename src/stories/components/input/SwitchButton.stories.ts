import { Meta, StoryObj } from '@storybook/react';
import Switch from '@/components/buttons/SwitchButton';

const meta = {
  component: Switch,
  title: 'Component/Input/SwitchButton',
  tags: ['autodocs']
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof Switch>;

const BasicSwitchButton = {
  args: {
    label: 'Test',
    checked: false,
    onChange: () => {}
  }
} satisfies Story;

export { BasicSwitchButton };
