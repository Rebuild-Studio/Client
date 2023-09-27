import Toolbar from "@/features/assetLibrary/body/assetList/Toolbar";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Toolbar,
  title: "Feature/AssetLibrary/AssetList/Toolbar",
  tags: ["autodocs"],
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: "에셋 라이브러리 리스트 툴바 입니다.",
      },
    },
  },
} satisfies Meta<typeof Toolbar>;

export default meta;
type Story = StoryObj<typeof Toolbar>;

export const AssetLibraryToolbar = {} satisfies Story;
