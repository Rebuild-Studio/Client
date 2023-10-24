import CategoryItem from "@/features/assetLibrary/components/body/category/CategoryItem";
import { MainCategory } from "@/features/assetLibrary/constants/mainCategory";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: CategoryItem,
  title: "Feature/AssetLibrary/Category/CategoryItem",
  tags: ["autodocs"],
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: "에셋 라이브러리 카테고리 아이템 입니다.",
      },
    },
  },
} satisfies Meta<typeof CategoryItem>;

export default meta;
type Story = StoryObj<typeof CategoryItem>;

const mainCategory: MainCategory = {
  category: "hom",
  categoryKR: "집",
};

export const AssetLibraryCategoryList = {
  args: {
    name: mainCategory.categoryKR,
    category: mainCategory.category,
    type: "main",
  },
} satisfies Story;
