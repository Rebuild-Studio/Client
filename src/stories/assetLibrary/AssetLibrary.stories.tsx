import type { Meta, StoryObj } from "@storybook/react";
import AssetLibrary from "@/features/assetLibrary";

const meta = {
  component: AssetLibrary,
  title: "Feature/AssetLibrary/AssetLibraryContainer",
  tags: ["autodocs"],
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: "아이콘 버튼 컴포넌트입니다.",
      },
    },
    layout: "centered",
  },
} satisfies Meta<typeof AssetLibrary>;

export default meta;
type Story = StoryObj<typeof AssetLibrary>;

export const AssetLibraryContainer = {
  args: {},
} satisfies Story;
