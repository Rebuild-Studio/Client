import type { Meta, StoryObj } from '@storybook/react';

import ControllerBarComponent from '@/features/controllerBar';

const meta = {
  component: ControllerBarComponent,
  title: 'Feature/ControllerBar/ControllerBar'
} satisfies Meta<typeof ControllerBarComponent>;

export default meta;
type Story = StoryObj<typeof ControllerBarComponent>;

export const ControllerBar = {
  args: {}
} satisfies Story;
