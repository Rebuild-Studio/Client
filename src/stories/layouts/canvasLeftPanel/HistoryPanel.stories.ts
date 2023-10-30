import type { Meta, StoryObj } from '@storybook/react';
import { HistoryPanel } from '@/components/layout/CanvasLeftPanel/historyPanel/HistoryPanel';

const meta = {
  component: HistoryPanel,
  title: 'Layout/CanvasLeftPanel/HistoryPanel',
  tags: ['autodocs']
} satisfies Meta<typeof HistoryPanel>;

export default meta;
type Story = StoryObj<typeof HistoryPanel>;

export const Basic = {
  args: {
    undoList: [
      {
        instance: 'CUBE',
        attribute: 'add',
        snapshot: {}
      },
      {
        instance: 'CONE',
        attribute: 'add',
        snapshot: {}
      }
    ],
    redoList: [
      {
        instance: 'CUBE',
        attribute: 'add',
        snapshot: {}
      },
      {
        instance: 'CYLINDER',
        attribute: 'add',
        snapshot: {}
      },
      {
        instance: 'GROUP',
        attribute: 'add',
        snapshot: {}
      }
    ]
  }
} satisfies Story;
