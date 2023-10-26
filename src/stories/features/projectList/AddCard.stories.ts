import { AddCard } from '@/features/projectList/components/card/AddCard';
import { bgColors } from '@/resources/colors/colors';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: AddCard,
  title: 'Feature/ProjectList/Card/AddCard',
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'my-custom-background',
      values: [
        {
          name: 'my-custom-background',
          value: bgColors[282828]
        }
      ]
    }
  }
} satisfies Meta<typeof AddCard>;

export default meta;
type Story = StoryObj<typeof AddCard>;

export const Card = {
  args: {
    isClicked: false
  }
} satisfies Story;
