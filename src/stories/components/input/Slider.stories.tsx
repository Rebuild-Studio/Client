import Slider from '@/components/common/Slider';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Slider,
  title: 'Component/Input/Slider',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ margin: '3em', width: '200px' }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof Slider>;

export const BasicSlider = {
  args: {
    title: '환경강도',
    initValue: 0.5,
    max: 1,
    min: 0,
    step: 0.01
  }
} satisfies Story;

export const Disabled = {
  args: {
    title: '환경강도',
    initValue: 0.5,
    max: 1,
    min: 0,
    step: 0.01,
    disabled: true
  }
} satisfies Story;
