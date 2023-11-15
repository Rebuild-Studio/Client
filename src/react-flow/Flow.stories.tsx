import type { Meta, StoryObj } from '@storybook/react';
import Flow from './Flow.tsx';

const meta = {
  component: Flow,
  title: 'interaction/flow'
} satisfies Meta<typeof Flow>;

export default meta;
type Story = StoryObj<typeof Flow>;

export const test = {} satisfies Story;
