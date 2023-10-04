import Toast from "@/components/common/Toast";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Toast,
  title: "Component/Common/Toast",
  tags: ["autodocs"],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof Toast>;

export const SimpleMessage = {
  args: {
    label: "저장되었습니다",
  },
} satisfies Story;

export const WithoutFadeIn = {
  args: {
    label: "이 메시지는 fadeOut만 적용되는 토스트 입니다",
    fadeOut: true,
    fadeIn: false,
  },
} satisfies Story;

export const WithoutFadeOut = {
  args: {
    label: "이 메시지는 fadeIn만 적용되는 토스트 입니다",
    fadeOut: false,
    fadeIn: true,
  },
} satisfies Story;

export const ShortTimeToast = {
  args: {
    label: "반짝, 1초뒤에 사라집니다",
    duration: 1000,
  },
} satisfies Story;


export const CustomizedToastLasting7seconds = {
  args: {
    label: "닫기",
    duration: 7000,
    borderRadius: "6px",
    backgroundColor: "#282828",
    fontFamily: "SpoqaHanSansNeo",
    color: "#fff",
  },
} satisfies Story;
