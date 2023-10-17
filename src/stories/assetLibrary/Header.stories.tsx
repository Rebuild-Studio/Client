import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import Header from "@/features/assetLibrary/components/header";
import { basicColors } from "@resources/colors/colors";

const meta = {
  component: Header,
  title: "Feature/AssetLibrary/AssetLibraryHeader",
  tags: ["autodocs"],
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: "에셋 라이브러리 헤더입니다.",
      },
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof Header>;

export const AssetLibraryHeader = {
  args: {
    title: "에셋 헤더입니다.",
  },
  decorators: [
    (Story: StoryFn) => (
      <div style={{ backgroundColor: basicColors.black }}>
        <Story />
      </div>
    ),
  ],
} satisfies Story;
