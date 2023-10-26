import { Card } from '@/components/common/Card';
import { bgColors } from '@/resources/colors/colors';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Card,
  title: 'Component/Card',
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
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof Card>;

export const Example = {
  args: {
    name: '오피스 테마',
    width: '245px',
    height: '245px',
    imageWidth: '100px',
    imageHeight: '100px',
    thumbnail: '/example/StartScene_Office.png',
    border: '1px dotted #fff',
    alt: 'error',
    hoverEffect: true,
    isClicked: false
  }
} satisfies Story;
