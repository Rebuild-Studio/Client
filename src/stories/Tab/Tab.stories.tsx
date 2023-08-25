import Tab from "@/components/common/tab/Tab";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Tab,
  title: "Component/Common/Tab",
  tags: ["autodocs"],
  argTypes: {
    $selectedColor: {
      control: "color",
    },
    $defaultColor: {
      control: "color",
    },
    width: {
      control: {
        type: "text",
      },
    },
    height: {
      control: {
        type: "text",
      },
    },
    $imgWidth: {
      control: {
        type: "text",
      },
    },
    $imgHeight: {
      control: {
        type: "text",
      },
    },
    $imgGravity: {
      options: ["LEFT", "TOP", "RIGHT", "BOTTOM"],
      control: {
        type: "radio",
      },
    },
  },
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof Tab>;

const TextTab = {} satisfies Story;

const ImageTab = {
  args: {
    isImgVisible: true,
    defaultImgUri: "https://www.svgrepo.com/show/521486/arrow-up.svg",
    selectedImgUri: "https://www.svgrepo.com/show/521469/arrow-down.svg",
  },
} satisfies Story;

export { TextTab, ImageTab };
