import DomainDropdown from "@/features/assetLibrary/components/body/assetList/toolbar/DomainDropdown";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: DomainDropdown,
  title: "Feature/AssetLibrary/AssetList/Dropdown",
  tags: ["autodocs"],
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: "에셋 라이브러리 도메인 드랍다운 입니다.",
      },
    },
  },
} satisfies Meta<typeof DomainDropdown>;

export default meta;
type Story = StoryObj<typeof DomainDropdown>;

export const AssetLibraryDomainDropdown = {} satisfies Story;
