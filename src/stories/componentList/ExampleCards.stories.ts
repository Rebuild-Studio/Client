import type { Meta, StoryObj } from "@storybook/react";
import { ExampleCards } from "@components/layout/componentList/ExampleCards";

const meta = {
  component: ExampleCards,
  title: "Component/Layout/ComponentList/ExampleCards",
  tags: ["autodocs"]
} satisfies Meta<typeof ExampleCards>;

export default meta;
type Story = StoryObj<typeof ExampleCards>;

export const basic = {
  args: {
    componentData: [
      {
        name: "오피스 테마",
        thumbnail: "/example/StartScene_Office.png",
        isClicked: false
      },
      {
        name: "플래피 캣 게임",
        thumbnail: "/example/game_end.png",
        isClicked: false
      }
    ]
  }
} satisfies Story;
