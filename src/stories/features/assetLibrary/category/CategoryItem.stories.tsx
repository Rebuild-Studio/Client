import type { Meta, StoryObj } from '@storybook/react';
import CategoryList from '@/features/assetLibrary/components/body/category/Category';

const meta = {
  component: CategoryList,
  title: 'Feature/AssetLibrary/Category/CategoryList',
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: '에셋 라이브러리 카테고리 리스트 입니다.'
      }
    }
  }
} satisfies Meta<typeof CategoryList>;

export default meta;
type Story = StoryObj<typeof CategoryList>;

export const AssetLibraryCategoryList = {} satisfies Story;
