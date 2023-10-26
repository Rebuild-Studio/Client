import { Meta, StoryObj } from '@storybook/react';
import InputField from '@/components/common/InputField';

const meta = {
  component: InputField,
  title: 'Component/Input/InputField',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    type: {
      defaultValue: 'number',
      options: [
        'text',
        'password',
        'email',
        'number',
        'url',
        'date',
        'time',
        'checkbox',
        'radio',
        'color',
        'file',
        'hidden',
        'search'
      ]
    }
  }
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof InputField>;

const BasicNumberInputField = {
  args: {
    label: 'X',
    type: 'number'
  }
} satisfies Story;

const BasicTextInputField = {
  args: {
    label: 'X',
    type: 'text'
  }
} satisfies Story;

export { BasicNumberInputField, BasicTextInputField };
