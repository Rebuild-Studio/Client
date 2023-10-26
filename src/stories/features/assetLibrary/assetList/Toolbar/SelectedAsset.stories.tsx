import type { Meta, StoryObj } from '@storybook/react';
import SelectedAsset from '@/features/assetLibrary/components/body/assetList/toolbar/SelectedAsset';

const meta = {
  component: SelectedAsset,
  title: 'Feature/AssetLibrary/AssetList/SelectedAsset',
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: '에셋 라이브러리 선택된 에셋 입니다.'
      }
    }
  }
} satisfies Meta<typeof SelectedAsset>;

export default meta;
type Story = StoryObj<typeof SelectedAsset>;

export const AssetLibrarySelectedAsset = {
  args: {
    asset: {
      id: 'myAssetId',
      name: 'myAssetTest',
      fileName: 'myAssetTest.png',
      type: 'asset',
      domain: 'all',
      createdAt: '2023-10-06T07:00:00.000Z',
      author: 'junman'
    }
  }
} satisfies Story;
