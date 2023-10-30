import type { Meta, StoryObj } from '@storybook/react';
import Footer from '@/features/assetLibrary/components/footer';

const meta = {
  component: Footer,
  title: 'Feature/AssetLibrary/AssetLibraryFooter',
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: '에셋 라이브러리 푸터입니다.'
      }
    }
  }
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof Footer>;

export const AssetLibraryFooter = {} satisfies Story;
