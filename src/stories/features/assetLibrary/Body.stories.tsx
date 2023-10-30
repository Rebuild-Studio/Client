import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import Body from '@/features/assetLibrary/components/body';
import { basicColors } from '@/resources/colors/colors';

const meta = {
  component: Body,
  title: 'Feature/AssetLibrary/AssetLibraryBody',
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: '에셋 라이브러리 바디입니다.'
      }
    }
  }
} satisfies Meta<typeof Body>;

export default meta;
type Story = StoryObj<typeof Body>;

export const AssetLibraryBody = {
  decorators: [
    (Story: StoryFn) => (
      <div style={{ backgroundColor: basicColors.black }}>
        <Story />
      </div>
    )
  ]
} satisfies Story;
