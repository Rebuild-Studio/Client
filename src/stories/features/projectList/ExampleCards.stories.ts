import type { Meta, StoryObj } from '@storybook/react';
import { TemplateCards } from '@/features/projectList/components/TemplateCards';

const meta = {
  component: TemplateCards,
  title: 'Feature/ProjectList/TemplateCards',
  tags: ['autodocs']
} satisfies Meta<typeof TemplateCards>;

export default meta;
type Story = StoryObj<typeof TemplateCards>;

export const Basic = {
  args: {
    projects: [
      {
        type: 'template',
        id: '1',
        name: '오피스 테마',
        thumbnail: '/example/StartScene_Office.png',
        savedAt: '2021-09-01'
      }
    ]
  }
} satisfies Story;
