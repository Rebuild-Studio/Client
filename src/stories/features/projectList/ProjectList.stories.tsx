import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProjectList from '@/features/projectList/components/ProjectList';

const meta = {
  component: ProjectList,
  title: 'Feature/ProjectList/ProjectList',
  tags: ['autodocs']
} satisfies Meta<typeof ProjectList>;

export default meta;
type Story = StoryObj<typeof ProjectList>;

const client = new QueryClient();

export const BasicProjectList = {
  args: {
    label: 'project'
  },
  decorators: [
    (Story: StoryFn) => (
      <QueryClientProvider client={client}>
        <Story />
      </QueryClientProvider>
    )
  ]
} satisfies Story;
