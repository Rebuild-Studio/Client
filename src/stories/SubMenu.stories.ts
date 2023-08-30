import SubMenu from "@/components/common/SubMenu";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Component/Common/SubMenu",
  component: SubMenu,
  tags: ["autodocs"],
} satisfies Meta<typeof SubMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicSubMenu: Story = {
  args: {
    menuItems: [
      {
        label: "목록",
        disabled: false,
        onClick: () => {
          alert("목록");
        },
      },
      {
        label: "저장",
        disabled: true,
        onClick: () => {
          alert("저장");
        },
      },
      {
        label: "로컬 파일로 저장",
        disabled: false,
        children: [
          { label: "Scene 저장", disabled: false },
          { label: "선택된 에셋 저장", disabled: false },
          { label: "선택된 에셋 저장2", disabled: false },
          { label: "선택된 에셋 저장3", disabled: false },
        ],
      },
      {
        label: "배포하기",
        disabled: false,
        children: [
          { label: "ffff", disabled: false },
          {
            label: "ddddd",
            disabled: false,
            children: [{ label: "ㅇㅇㅇㅇㅇ", disabled: false }],
          },
        ],
      },
    ],
  },
};
