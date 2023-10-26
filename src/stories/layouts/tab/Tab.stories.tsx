import type { Meta, StoryObj } from '@storybook/react';
import Tab from '@/components/layout/Tab';
import { basicColors, bgColors } from '@/resources/colors/colors';

const meta = {
  component: Tab,
  title: 'Layout/Tab',
  tags: ['autodocs']
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof Tab>;

export const BasicTab = {
  args: {
    backgroundColor: bgColors[101728],
    underbarColor: basicColors.lightLimeGreen,
    tabs: ['aa', 'bb', 'cc', 'fffff'],
    width: '800px',
    height: '30px',
    onTabChange: (index: number) => {
      console.log(index);
    }
  }
} satisfies Story;
