import { SubMenu } from "@/components/common/subMenu/SubMenu";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Component/SubMenu",
  component: SubMenu,
  tags: ["autodocs"],
} satisfies Meta<typeof SubMenu>;

export default meta;
type Story = StoryObj<typeof SubMenu>;

export const BasicSubMenu = {
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
          { label: "Scene 저장", disabled: false, onClick: () => {} },
          { label: "선택된 에셋 저장", disabled: false, onClick: () => {} },
          { label: "선택된 에셋 저장2", disabled: false, onClick: () => {} },
          { label: "선택된 에셋 저장3", disabled: false, onClick: () => {} },
        ],
      },
      {
        label: "배포하기",
        disabled: false,
        children: [
          { label: "ffff", disabled: false, onClick: () => {} },
          {
            label: "ddddd",
            disabled: false,
            children: [
              { label: "ㅇㅇㅇㅇㅇ", disabled: false, onClick: () => {} },
            ],
          },
        ],
      },
    ],
  },
} satisfies Story;
