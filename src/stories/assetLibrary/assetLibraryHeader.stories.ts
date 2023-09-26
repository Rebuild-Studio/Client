import type { Meta, StoryObj } from "@storybook/react";
import Header from "@/features/assetLibrary/header";

const meta = {
  component: Header,
  title: "Feature/AssetLibrary/AssetLibraryContainer",
  tags: ["autodocs"],
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: "아이콘 버튼 컴포넌트입니다.",
      },
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof Header>;

export const AssetLibraryHeader = {
  args: {},
} satisfies Story;
