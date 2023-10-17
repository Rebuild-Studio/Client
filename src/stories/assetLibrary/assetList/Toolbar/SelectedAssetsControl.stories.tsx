import type { Meta, StoryObj } from "@storybook/react";
import SelectedAssetsControl from "@/features/assetLibrary/components/body/assetList/toolbar/SelectedAssetsControl";

const meta = {
  component: SelectedAssetsControl,
  title: "Feature/AssetLibrary/AssetList/SelectedAssetsControl",
  tags: ["autodocs"],
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: "에셋 라이브러리 선택된 에셋 컨트롤 바 입니다.",
      },
    },
  },
} satisfies Meta<typeof SelectedAssetsControl>;

export default meta;
type Story = StoryObj<typeof SelectedAssetsControl>;

export const AssetLibrarySelectedAssetsControl = {} satisfies Story;
