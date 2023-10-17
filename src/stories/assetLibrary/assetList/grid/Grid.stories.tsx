import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import AssetGrid from "@/features/assetLibrary/components/body/assetList/grid/AssetGrid";
import { useFetchLibraryAssets } from "@/features/assetLibrary/hooks/useFetchLibraryAssets query";

const meta = {
  component: AssetGrid,
  title: "Feature/AssetLibrary/AssetList/Grid",
  tags: ["autodocs"],
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: "에셋 라이브러리 리스트 그리드 입니다."
      }
    }
  }
} satisfies Meta<typeof AssetGrid>;

export default meta;
type Story = StoryObj<typeof AssetGrid>;

export const AssetLibraryGrid = {
  decorators: [
    (Story: StoryFn) => {
      useFetchLibraryAssets({
        domain: "all",
        majorCategories: "all",
        minorCategories: "all",
        page: 1
      });

      return (
        <div>
          <Story />
        </div>
      );
    }
  ]
} satisfies Story;
